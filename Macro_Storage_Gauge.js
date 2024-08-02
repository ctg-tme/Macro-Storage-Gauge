/********************************************************
Copyright (c) 2024 Cisco and/or its affiliates.
This software is licensed to you under the terms of the Cisco Sample
Code License, Version 1.1 (the "License"). You may obtain a copy of the
License at
               https://developer.cisco.com/docs/licenses
All use of the material herein must be in accordance with the terms of
the License. All rights not expressly granted by the License are
reserved. Unless required by applicable law or agreed to separately in
writing, software distributed under the License is distributed on an "AS
IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
or implied.
*********************************************************

 * Author(s):               Robert(Bobby) McGonigle Jr
 *                          Technical Marketing Engineer
 *                          Cisco Systems
*/

import xapi from 'xapi';

function estimateFileSize(text) {
  const characterCount = text.length;

  const bytes = characterCount;
  const kilobytes = Math.round((bytes / 1024) * 10000) / 10000;
  const megabytes = Math.round((kilobytes / 1024) * 10000) / 10000;

  return { bytes: bytes, kilobytes: kilobytes, megabytes: megabytes, };
}

async function analyzeMacroEnvironment() {
  const macros = await xapi.Command.Macros.Macro.Get({ Content: 'True' });
  let totals = { bytes: 0, kilobytes: 0, megabytes: 0 };

  macros.Macro.forEach(element => {
    let fileSizes = estimateFileSize(element.Content);
    totals.bytes = totals.bytes + fileSizes.bytes;
    totals.kilobytes = totals.kilobytes + fileSizes.kilobytes;
    totals.megabytes = totals.megabytes + fileSizes.megabytes;
    macros.Macro['Size'] = fileSizes.bytes;
  });
  totals.kilobytes = Math.round((totals.bytes / 1024) * 100) / 100;
  totals.megabytes = Math.round((totals.kilobytes / 1024) * 100) / 100;

  generateProgressBar(totals.kilobytes);
}

function generateProgressBar(x) {
  const progressBarLength = 20;
  const completed = Math.round((x / 2048) * progressBarLength);
  const remaining = progressBarLength - completed;

  const progressBar = '🟥'.repeat(completed) + '🟩'.repeat(remaining);
  const percentage = ((x / 2048) * 100).toFixed(2);

  console.log(`Storage Storage: ${progressBar} ${percentage}% used`);
  return `${progressBar} ${percentage}%`;
}

analyzeMacroEnvironment();