import React from 'react';

import { ExtWebLink } from './about';

export function FeeliesPage()
{
    return (
        <div className="ScrollContent">
            <div className="FeeliesPage">
                <h2>How to do magic</h2>
                <p>
                    The magic of <i>Enchanter</i> is lifted from
                    Dungeons &amp; Dragons (which, as everyone knows,
                    lifted it from Jack Vance).
                </p>
                <h3>Your spell book</h3>
                <p>
                    To cast a spell, you must first memorize it from your
                    spell book. Type <code>READ BOOK</code> to see the list
                    of spells at your disposal. Then you might type{' '}
                    <code>LEARN FROTZ</code> to absorb the <code>FROTZ</code>
                    {' '}spell (&#x201C;cause something to give off
                    light&#x201D;) into your mind.
                </p>
                <p>
                    Type <code>SPELLS</code> to check the spells you
                    currently have ready in mind. In fact you begin your
                    quest with three spells memorized; but there&#x2019;s a
                    fourth in your spell book. Don&#x2019;t lose track.
                </p>
                <p>
                    Now it&#x2019;s time to make magic. You could type
                    {' '}<code>CAST FROTZ ON LANTERN</code>, or just
                    {' '}<code>FROTZ LANTERN</code> for short.
                </p>
                <p>
                    Once loosed, the puissant syllables of power fly from
                    your mind and are lost! You must <code>LEARN</code>
                    {' '}the spell again to cast it again.
                </p>
                <p>
                    Initially you can hold only four spells in your
                    mind at a time. (Duplicates are allowed.) As you progress,
                    the limit will increase.
                </p>
                <h3>Spell scrolls</h3>
                <p>
                    In your travels you will undoubtedly discover scrolls
                    containing new and potent spells. <code>READ SCROLL</code>
                    {' '}to see the spell&#x2019;s name and effect.
                </p>
                <p>
                    You can cast a spell directly from a scroll in your hand.
                    However, this is wasteful! Just like spells in your
                    mind, a scroll spell disappears when cast &#x2014;
                    taking the scroll with it.
                </p>
                <p>
                    Instead, you should copy the spell into your book with
                    the <code>GNUSTO</code> spell. If you discover a{' '}
                    <code>REZROV</code> scroll, for example, you would
                    type <code>GNUSTO REZROV</code>. (Remember to target
                    the spell, not the scroll.) Once the spell is in your
                    spell book, you can <code>LEARN</code> it and cast it
                    as many times as you want.
                </p>
                <p>
                    Note that you know <code>GNUSTO</code> spell by heart.
                    You will never forget it, so you never have to{' '}
                    <code>LEARN GNUSTO</code>.
                </p>
                <p>
                    A few scrolls are so powerful that they cannot be copied
                    with <code>GNUSTO</code>. Such a spell can <em>only</em>
                    {' '}be cast from its scroll &#x2014; which means you can
                    only cast it once. Choose your opportunity wisely.
                </p>
                <h3>A final warning</h3>
                <p>
                    Your training as an Enchanter has given you a heightened
                    sensitivity to magic.
                    Sometimes a spell which a mundane person would not even
                    notice will have a profound effect on you!
                </p>
                <h3>Other useful commands</h3>
                <p>
                    <code>TIME</code>: Show the approximate time of day.
                    <br/>
                    <code>DIAGNOSE</code>: Show your physical condition.
                    <br/>
                    <code>SPELLS</code>: List the spells you have memorized.
                    <br/>
                </p>
                <h2>The prophecy</h2>
                <p>
                    <i>Enchanter</i> originally came with a
                    sealed parchment; this is the document Belboz reveals
                    at the start of the game. It explains why a novice
                    enchanter is being sent to deal with a world-threatening
                    evil. It also lists your starting spells.
                </p>
                <p>
                    Note: This is scanned from the &#x201C;Grey Box&#x201D;
                    release of the game. The original 1984
                    &#x201C;Folio&#x201D; had an identical document at a
                    larger size. This one was easier to scan.
                </p>
                <p>
                    For a scan of the complete manual, visit the{' '}
                    <ExtWebLink url={ 'https://infodoc.plover.net/manuals/temp/enchante.pdf' } text={ 'InfoDoc Project' } />.
                    For high-resolution scans, visit the{' '}
                    <ExtWebLink url={ 'https://archive.org/details/Infocom_Enchanter_Apple/' } text={ 'Internet Archive' } />.
                </p>
                <FeelieLink url={ 'spell-list-outside.jpeg' } width={ 250 } height={ 145 } text={ 'Parchment, folded' } />
                <FeelieLink url={ 'spell-list-inside.jpeg' } width={ 250 } height={ 640 } text={ 'Parchment, unfolded' } />
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
