import React from "react";
import {render} from '@testing-library/react';
import CharacterCardList from "./CharacterCardList";
import { test } from "vitest";

const characters = [ {
  age: 99999,
  bio: "testtbio2",
  className: "testclass,name2",
  gold: 10,
  height: "6 ft 2, in",
  hp: 10,
  id: 2,
  inventory: ['blowgun-needle'],
  level: 2,
  name: 'testname2',
  profileUrl: "/static/images/default_profile.png",
  userId: 1
  },{
  age: 333,
  bio: "testtbio",
  className: "testclassname",
  gold: 10,
  height: "6 ft 2, in",
  hp: 10,
  id: 3,
  inventory: ['blowgun-needle'],
  level: 1,
  name: 'testname',
  profileUrl: "/static/images/default_profile.png",
  userId: 2
  }
]

test('it renders without crashing', () => {
  render(<CharacterCardList characters={characters} />)
});
