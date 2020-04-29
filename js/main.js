/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

/* global AudioContext, SoundMeter */

'use strict';

const instantMeter = document.querySelector('#instant meter');
const slowMeter = document.querySelector('#slow meter');
const clipMeter = document.querySelector('#clip meter');

const instantValueDisplay = document.querySelector('#instant .value');
const slowValueDisplay = document.querySelector('#slow .value');
const clipValueDisplay = document.querySelector('#clip .value');

const luciMouth = document.querySelector('.luci-mouth');
const blncgMouth = document.querySelector('.balenciaga-mouth');
const blncgEyes = document.querySelector('.balenciaga-eyes');
const lcEyes = document.querySelector('.luci-eyes');
let blncgRandom = 0;
let luciRandom = 0;

try {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  window.audioContext = new AudioContext();
} catch (e) {
  alert('Web Audio API not supported.');
}

const constraints = window.constraints = {
  audio: true,
  video: false
};

function handleSuccess(stream) {
  window.stream = stream;
  const soundMeter = window.soundMeter = new SoundMeter(window.audioContext);
  soundMeter.connectToSource(stream, function(e) {
    if (e) {
      alert(e);
      return;
    }
    setInterval(() => {
      let number = Math.ceil(soundMeter.instant.toFixed(2) * 20 * 2);
      let balenciagaNumber = Math.ceil(number / 4);
      luciMouth.style.backgroundImage = 'url(images/' + number + '.png)';
      blncgMouth.style.backgroundImage = 'url(images/balenciaga/' + number + '.png)';
      instantMeter.value = instantValueDisplay.innerText =
        soundMeter.instant.toFixed(2);
      slowMeter.value = slowValueDisplay.innerText =
        soundMeter.slow.toFixed(2);
      clipMeter.value = clipValueDisplay.innerText =
        soundMeter.clip;
    }, 200);
  });
}

function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

function balenciagaEyesStart() {
  blncgRandom = getRandomArbitrary(3, 10) * 1000;
  setTimeout(balenciagaEyes, blncgRandom);
}

function balenciagaEyes() {
  blncgEyes.classList.add('balenciaga-eyes-animation');
  setTimeout(function() {
    blncgEyes.classList.remove('balenciaga-eyes-animation');
    balenciagaEyesStart();
  }, 3000);
}

function luciEyesStart() {
  luciRandom = getRandomArbitrary(3, 10) * 1000;
  setTimeout(luciEyes, luciRandom);
}

function luciEyes() {
  lcEyes.classList.add('luci-eyes-animation');
  setTimeout(function() {
    lcEyes.classList.remove('luci-eyes-animation');
    luciEyesStart();
  }, 3000);
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);

balenciagaEyesStart();
luciEyesStart();