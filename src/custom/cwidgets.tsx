import React from 'react';
import { useState, useContext, createContext } from 'react';

import { ZStatePlus, ZObject } from '../visi/zstate';
import { ObjectData, GlobalData } from '../visi/gametypes';
import { ReactCtx, StackCallCtx } from '../visi/context';
import { ArgShowObject, ArgShowProperty } from '../visi/actshowers';
import { VarShowObject, VarShowProperty } from '../visi/globshow';
import { gamedat_ids, gamedat_distances, gamedat_object_treesort } from '../visi/gamedat';
import { tmaze_rooms, tmaze_props } from './modgame';

export function contains_label(obj: ObjectData) : string
{
    if (!obj.isroom) {
        // ...or other NPCs
        if (obj.onum == gamedat_ids.PLAYER || obj.onum == gamedat_ids.ADVENTURER)
            return 'carries';
        else
            return 'contains'
    }
    return '';
}

export function sorter_for_key(key: number, zstate: ZStatePlus) : (roots:ZObject[], map:Map<number, ZObject>) => void
{
    let originobj: number = gamedat_ids.PLAYER;

    return function(roots: ZObject[], map: Map<number, ZObject>) {
        let advroom = originobj;

        while (true) {
            let tup = map.get(advroom);
            if (!tup || tup.parent == 0 || tup.parent == gamedat_ids.ROOMS)
                break;
            advroom = tup.parent;
        }
        
        if (!gamedat_distances[advroom])
            advroom = gamedat_ids.STARTROOM;
        let distmap = gamedat_distances[advroom];

        roots.sort((o1, o2) => {
            let sort1 = gamedat_object_treesort.get(o1.onum) ?? 0;
            let sort2 = gamedat_object_treesort.get(o2.onum) ?? 0;
            if (sort1 != sort2)
                return sort1 - sort2;
            if (sort1 == 1 && distmap !== undefined)
                return distmap[o1.onum] - distmap[o2.onum];
            return (o1.onum - o2.onum);
        });
    }
}

export function ObjListSorter({ followKey, setFollowKey } : { followKey:number, setFollowKey:(v:number)=>void })
{
    return (
        <div>
            (Following Player)
        </div>
    );
}

export function global_value_display(tag: string, value: number, glo: GlobalData) : JSX.Element|null
{
    switch (tag) {
        
    case 'PRSO':
        let rctx = useContext(ReactCtx);
        if (rctx.zstate.globals[127] == 128) {  /* PRSA == WALK */
            return (
                <VarShowProperty value={ value } />
            )
        }
        return (
            <VarShowObject value={ value } />
        )

    case 'TIMEOFDAY':
        return (
            <VarShowTimeOfDay value={ value } />
        )
        
    }
    
    return null;
}

export function property_value_display(tag: string, values: number[]) : JSX.Element|null
{
    switch (tag) {
        
    case 'TMAZE':
        return (
            <VarShowTMazeList value={ values[0]*0x100+values[1] } />
        );
        
    case 'MAZEPOINT':
        return (
            <VarShowTMazePoint value={ values[0]*0x100+values[1] } />
        );
    }
    
    return null;
}

export function stack_call_arg_display(tag: string, value: number) : JSX.Element|null
{
    switch (tag) {
        
    case 'PERFORMO':
        let ctx = useContext(StackCallCtx);
        if (ctx.args[0] == 128) {      /* action WALK */
            return (
                <ArgShowProperty value={ value } />
            );
        }
        return (
            <ArgShowObject value={ value } />
        )
        
    case 'PERFORMI':
        return (
            <ArgShowObject value={ value } />
        )

    case 'TDIR':
        return (
            <ArgShowMazeDir value={ value } />
        )
        
    }

    return null;
}

export function VarShowTimeOfDay({ value }: { value:number })
{
    let hour = 6 + Math.floor(value / 5);
    let ampm = 'am';

    if (hour > 24) {
        hour -= 24;
    }
    else if (hour == 24) {
        hour = 12;
        ampm = 'midnight';
    }
    else if (hour > 12) {
        hour -= 12;
        ampm = 'pm';
    }
    else if (hour == 12) {
        ampm = 'noon';
    }
    
    return (
        <span>{ value } <i>(~{ hour } { ampm })</i></span>
    );
}

const tmaze_dirs: { [key:number]: string } = {
    1: 'nw',
    3: 'west',
    5: 'sw',
    7: 'south',
    9: 'se',
    11: 'east',
    13: 'ne',
    15: 'north',
};

export function ArgShowMazeDir({ value }: { value:number })
{
    let dir = tmaze_dirs[value] || '???';
    
    return (
        <span>{ value }:<i>{ dir }</i></span>
    );
}

function VarShowTMazePoint({ value }: { value:number })
{
    if (value < 1 || value > 9) {
        <span>{ value } (room ???)</span>
    }
    
    return (
        <span>{ value } (room <ArgShowObject value={ tmaze_rooms[value-1] } />)</span>
    );
}

function VarShowTMazeList({ value }: { value:number })
{
    let rctx = useContext(ReactCtx);
    let pos = tmaze_props.indexOf(value);
    if (pos < 0) {
        return (
            <span><i>invalid tmaze address:</i> { value }</span>
        );
    }
    
    let tmaze = rctx.zstate.specifics.tmaze[pos];

    let ells = [];
    for (let dir = 0; dir <= 15; dir += 2) {
        if (tmaze[dir]) {
            let comma = (ells.length ? ', ' : '');
            let open = (tmaze[dir+1] ? '(drawn)':'(erased)');
            ells.push(
                <span key={ dir }>
                    { comma }
                    <ArgShowObject value={ tmaze[dir] } />:{' '}
                    { tmaze_dirs[dir+1] } { open }
                </span>
            )
        }
    }
    
    return (
        <span>{ ells }</span>
    );
}
