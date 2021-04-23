import React from 'react';

const Music = (props) =>{
    return (
        <section>
            <p>Name: {props.name}</p>
            <p>Artist: {props.artist}</p>
            <p>Year: {props.year}</p>
        </section>
    )
};


export default Music;