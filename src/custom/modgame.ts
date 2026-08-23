import { unpack_address } from '../visi/gametypes';
import { GnustoEngine, ZState } from '../visi/zstate';
import { gamedat_routine_names, gamedat_global_names, gamedat_string_map } from '../visi/gamedat';

// Translucent rooms A-I.
export const tmaze_rooms = [ 240, 174, 119, 56, 231, 163, 104, 34, 216 ];
export const tmaze_props = [ 11351, 11385, 11419, 11453, 11487, 11521, 11555, 11589, 11623 ];

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


export function show_commentary_hook(topic: string, engine: GnustoEngine): string|null
{
    return null;
}

