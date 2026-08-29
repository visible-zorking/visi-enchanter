import { unpack_address } from '../visi/gametypes';
import { GnustoEngine, ZState, ZStatePlus } from '../visi/zstate';
import { gamedat_routine_names, gamedat_global_names, gamedat_string_map } from '../visi/gamedat';
import { ExtraToggle } from '../visi/map';

// Translucent rooms A-I.
export const tmaze_rooms = [ 240, 174, 119, 56, 231, 163, 104, 34, 216 ];
export const tmaze_props = [ 11351, 11385, 11419, 11453, 11487, 11521, 11555, 11589, 11623 ];
const tmaze_connections = [
    { id: 'tmaze-b-r', room: 0, dir: 7 }, // A south
    { id: 'tmaze-j-m', room: 4, dir: 7 }, // E
    { id: 'tmaze-k-h', room: 2, dir: 7 }, // C
    { id: 'tmaze-v-p', room: 6, dir: 7 }, // G
    { id: 'tmaze-b-j', room: 0, dir: 11 }, // A
    { id: 'tmaze-r-m', room: 1, dir: 11 }, // B
    { id: 'tmaze-k-v', room: 2, dir: 11 }, // C
    { id: 'tmaze-h-p', room: 3, dir: 11 }, // D
    { id: 'tmaze-m-f', room: 5, dir: 11 }, // F
    { id: 'tmaze-b-k', room: 0, dir: 9 }, // A
    { id: 'tmaze-k-m', room: 2, dir: 9 }, // C
    { id: 'tmaze-m-p', room: 5, dir: 9 }, // F
    { id: 'tmaze-v-f', room: 6, dir: 9 }, // G
    { id: 'tmaze-j-v', room: 4, dir: 9 }, // E
    { id: 'tmaze-r-h', room: 1, dir: 9 }, // B
    { id: 'tmaze-f-p', room: 7, dir: 5 }, // H
    { id: 'tmaze-v-m', room: 6, dir: 5 }, // G
    { id: 'tmaze-j-k', room: 4, dir: 5 }, // E
    { id: 'tmaze-k-r', room: 2, dir: 5 }, // C
    { id: 'tmaze-m-h', room: 5, dir: 5 }, // F
];

export type SpecificEnchanter = {
    tmaze: number[][],
};

export function get_specifics(engine: GnustoEngine, state: ZState): SpecificEnchanter
{
    let tmaze: number[][] = [];

    for (let addr of tmaze_props) {
        let ls = [];
        for (let ix=1; ix<32; ix += 2)
            ls.push(engine.getByte(addr+ix));
        tmaze.push(ls);
    }

    return { tmaze };
}

export function map_adjustments(zstate: ZStatePlus): ExtraToggle[]
{
    let tmaze = zstate.specifics.tmaze;

    let ls = tmaze_connections.map( (obj) => ({
        id:obj.id,
        class:(tmaze[obj.room][obj.dir] ? 'Drawn' : 'Erased'),
    }));
    
    return ls;
}

export function show_commentary_hook(topic: string, engine: GnustoEngine): string|null
{
    return null;
}

