import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";


export const Explore = () => {
window.onload = function() {
  fetch('/api/single')
      .then(response => response.json())
      .then(posts => {
          const gridContainer = document.getElementById('grid-container');
          posts.forEach(post => {
              const postDiv = document.createElement('div');
              postDiv.className = 'post';
              postDiv.innerHTML = `
                  <img src="${post.image_url}" alt="${post.title}">
                  <h2>${post.title}</h2>
                  <p>${post.content}</p>
              `;
              gridContainer.appendChild(postDiv);
          });
      });
};
}