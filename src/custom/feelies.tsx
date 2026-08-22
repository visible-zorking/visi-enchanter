import React from 'react';

import { ExtWebLink } from './about';

export function FeeliesPage()
{
    return (
        <div className="ScrollContent">
            <div className="FeeliesPage">
                <h2>How to do magic</h2>
                <p>
                    A few commands particular to Infocom&#x2019;s mystery
                    games:
                </p>
                <h2>The prophecy</h2>
                <p>
                    <i>Enchanter</i> originally came with a
                    sealed parchment &#x2014; the document Belboz reveals
                    at the start of the game. It explains why a novice
                    enchanter is being sent to deal with a world-threatening
                    evil. It also lists your starting spells.
                </p>
                <p>
                    Note: This is scanned from the &#x201C;Grey Box&#x201D;
                    release of the game. The original 1984
                    &#x201C;Folio&#x201D; had the same parchment at a
                    larger size. This one was easier to scan.
                </p>
                <p>
                    For a scan of the complete manual, visit the{' '}
                    <ExtWebLink url={ 'https://infodoc.plover.net/manuals/temp/enchante.pdf' } text={ 'InfoDoc Project' } />.
                    For high-resolution scans, visit the{' '}
                    <ExtWebLink url={ 'https://archive.org/details/Infocom_Enchanter_Apple/' } text={ 'Internet Archive' } />.
                </p>
                <hr />
                <FeelieLink url={ 'spell-list-outside.jpeg' } width={ 250 } height={ 145 } text={ 'Parchment, folded' } />
                <FeelieLink url={ 'spell-list-inside.jpeg' } width={ 250 } height={ 640 } text={ 'Parchment, unfolded' } />
                <hr />
            </div>
        </div>
    );
}

function FeelieLink({ url, text, width, height } : { url:string, text:string, width:number, height:number })
{
    return (
        <p className="Feelie">
            <a href={ './pic/'+url } target="_blank">
                <img src={ './pic/thumb/'+url } width={ width } height={ height } />
            </a>
            <br/>
            <a href={ './pic/'+url } target="_blank">{ text }</a>
        </p>
    )
}
