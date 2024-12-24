import React from "react";
import CharacterCard from "./CharacterCard"

//Shows list of characters

function CharacterCardList({characters}) {
  console.log(characters)
  return (

    <div className="container text-center">
      <div className="row">
        {characters.map(ch => (
        <div className="col">
        <CharacterCard
          key={ch.id}
          id={ch.id}
          name={ch.name}
          characterClass={ch.classname}
          bio={ch.bio}
          age={ch.age}
          height={ch.height}
          level={ch.level}
          inventory={ch.inventory}
          gold={ch.gold}
          hp={ch.hp}
          profileUrl={ch.profileurl}
          userId={ch.userid}
          />
        </div>
        ))}
      </div>
    </div>
  )
}

export default CharacterCardList;