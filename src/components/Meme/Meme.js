import React, { useState, useEffect } from "react";
import "./Meme.css";

import axios from "axios";

const Meme = () => {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  // state to intialise top text, bottom text and random image. Text is intially empty and there is an image. Combined with values in the return statement, they link with each and text boxes can be typed in

  const [allMemes, setAllMeme] = useState([]);

  useEffect(() => {
    // using axios to fetch API to get the top 100 most popular memes. If the call works, the response data is saved into state, if there is an error the error will be console.logged
    axios
      .get("https://api.imgflip.com/get_memes")
      .then((response) => {
        setAllMeme(response.data.data.memes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length); //get random number for a meme in the array the memes from the API
    const url = allMemes[randomNumber].url; //get a random url from the memes array

    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    })); // / prevMeme is the previous state of the meme (top text, bottom text, and random image). When the button is clicked, getMemeImage() will save the prevMeme and the url of a random image into the meme state, which then updates into the U.I. (as the img scr is meme.randomImage)
  }

  function handleChange(e) {
    const { name, value } = e.target; // destructuring the name and value from e.target, so it links with the text boxes

    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    })); // prevMeme is the previous state of the meme (top text, bottom text, and random image). Whatever is typed in the top and bottom text are saved into the meme state
  }

  return (
    <main>
      <div className="form">
        <div className="inputs">
          <input
            type="text"
            className="form--input"
            placeholder="Top text"
            name="topText"
            value={meme.topText}
            onChange={handleChange}
            // links with top text so text can be saved and typed in
          />
          <input
            type="text"
            className="form--input"
            placeholder="Bottom text"
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
          />
        </div>
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <div className="flex-meme-image">
          <img
            src={meme.randomImage}
            alt="Meme image"
            className="meme--image"
          />
        </div>
        <h2 className="meme--text top">{meme.topText}</h2>
        {/* display text at top of image */}
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
        {/* display text at bottom of image */}
      </div>
    </main>
  );
};

export default Meme;
