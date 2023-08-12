document.write('\
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" /> \
<nav class="topnav"> \
  <a href="/" class="active">Home</a> \
  <div class="dropdown"> \
    <button class="dropbtn"> \
      Keertan \
      <i class="fa fa-caret-down"></i> \
    </button> \
    <div class="dropdown-content"> \
      <a href="/Keertan/AkhandKeertan/">Akhand Keertan</a> \
      <a href="/Keertan/DarbarSahibPuratanKeertanSGPC">Darbar Sahib Puratan Keertan</a> \
      <a href="/Keertan/TimeBasedKeertan(RaagKeertan)">Time Based Keertan (Raag Keertan)</a> \
      <a href="/Keertan/AllKeertan">All Keertan</a> \
    </div> \
  </div> \
  <a href="/Paath/">Paath</a> \
  <a href="/SantGianiGurbachanSinghJiSGGSKatha/">Sant Giani Gurbachan Singh Ji SGGS Katha</a> \
  <a href="/BhagatJaswantSinghJi/">Bhagat Jaswant Singh Ji</a> \
  <a href="/PanjGranthi(BhaiJaswantSinghJi)/">Panj Granthi</a> \
  <a href="/MiscellaneousTopics">Miscellaneous Topics</a> \
  <a href="http://45.76.2.28/trackIndex">Tracks Indexed</a> \
  <a href="javascript:void(0);" style="font-size: 15px" class="icon" onclick="toggleDropdown()">&#9776;</a> \
</nav> \
 \
<script type="text/javascript" src="/assets/allShabads.js"></script> \
 \
<body> \
  <h1 class="border" id="MainTitle"></h1> \
  <div id="forSearch" class="section"> \
    <input placeholder="Search for Track:" id="searchInput" oninput="searchForShabad(this.value)" /> \
    <div class="sectionDisplay"> \
      <ol id="searchResults"></ol> \
    </div> \
  </div> \
  <p class="border" id="tracksData"></p> \
 \
  <div id="trackPlaying" style="display: none"> \
    <div id="trackInfo" class="border"> \
      <h4 style="margin: 0" id="trackFromWhichOpt"></h4> \
      <a id="trackNameAtag" target="_blank" rel="noopener noreferrer"></a> \
      <audio onended="playNextTrack()" onerror="" controls autoplay="true"></audio> \
      <div id="playBackOptions"> \
        <button onclick="skipTrackTime(-1)" class="skip10btn"> \
          <img src="/imgs/back10.png" /> \
        </button> \
        <button onclick="togglePausePlayTrack()" class="skip10btn"> \
          <img src="/imgs/pause.png" id="playPauseBtn" /> \
        </button> \
        <button onclick="skipTrackTime(1)" class="skip10btn"> \
          <img src="/imgs/forward10.png" /> \
        </button> \
      </div> \
 \
      <label for="pickSkipInterval">Skip Interval</label> \
      <select id="pickSkipInterval" onchange="changeInterval()"> \
        <option value="5">5 Seconds</option> \
        <option value="10">10 Seconds</option> \
        <option value="15">15 Seconds</option> \
        <option value="30">30 Seconds</option> \
        <option value="60">60 Seconds</option> \
      </select> \
    </div> \
    <div id="trackNavigationBtns"> \
      <button class="basicBtn trackNavBtn" onclick="playPreviousTrack()"> \
        &#8592; Back \
      </button> \
      <button id="shuffleBtn" class="basicBtn" onclick="toggleShuffle()"> \
        <img src="/imgs/shuffle_icon.png" /> \
        <p id="shuffle">Shuffle: OFF</p> \
      </button> \
      <button class="basicBtn trackNavBtn" onclick="playNextTrack()"> \
        Next &rarr; \
      </button> \
    </div> \
  </div> \
 \
  <hr /> \
  <div id="optionMenu" class="section"> \
    <button class="basicBtn" id="toggleShowingOpts" onclick="toggleShowingOpts()"> \
      Hide The Options \
    </button> \
    <div class="sectionDisplay"> \
      <div id="tracksOpts"> \
        <div id="checkBtnsOpts"> \
          <button class="basicBtn" onclick="check_uncheck_opts(false)"> \
            Uncheck All Options \
          </button> \
          <button class="basicBtn" onclick="check_uncheck_opts(true)"> \
            Check All Options \
          </button> \
        </div> \
        <!-- Options(label/checkbox inputs) will go here --> \
      </div> \
    </div> \
  </div> \
 \
  <hr /> \
  <button class="basicBtn" id="saveTrackBtn">Save Track Locally</button> \
  <div id="forSavedTracks" class="section"> \
    <button class="basicBtn" onclick="toggleSavedTracks()"> \
      Show Saved Tracks (Toggle) \
    </button> \
    <div class="sectionDisplay"> \
      <ol id="savedShabads"></ol> \
    </div> \
  </div> \
 \
  <hr /> \
  <div id="forShowTracks" class="section"> \
    <button class="basicBtn" onclick="toggleShowingTracks()"> \
      Show Tracks (Toggle) \
    </button> \
    <div class="sectionDisplay"> \
      <div id="showAllTracks"></div> \
    </div> \
  </div> \
 \
  <div id="saveTrackLocalModal" class="modal"> \
    <div id="saveTrackLocalModal-content"> \
      <span id="saveTrackLocalModalClose">&times;</span> \
      <label for="noteForSavedTrack">Enter a note if you would like (not needed):</label> \
      <div> \
        <textarea multiline placeholder="ex: Amazing Bani at 10:00" id="noteForSavedTrack"></textarea> \
      </div> \
      <div> \
        <button class="basicBtn" onclick="saveTrack()">Save</button> \
      </div> \
    </div> \
  </div> \
 \
  <div id="dialog" class="dialog"> \
    <div class="dialog-content"> \
      <p id="formInfo"></p> \
      <form id="modal-content" onsubmit="formValidation(event)" method="post" \
        action="http://45.76.2.28/trackIndex/addData.php"> \
        <span id="closeModal">&times;</span> \
        <div class="userInputItem"> \
          <label for="userDesc">Description:</label> \
          <input id="userDesc" name="description" placeholder="bin ek naam ik chit leen"></input> \
        </div> \
        <div class="userInputItem"> \
          <p id="theShabadSelected"></p> \
          <label for="usedShabadId">Shabad ID:</label> \
          <input list="shabadId_list_opts" id="usedShabadId" name="shabadId" placeholder="687 or ਤਕਮਲ" \
            oninput="add_shabad_from_user_input()"></input> \
          <div id="shabadId_list_opts"> \
          </div> \
        </div> \
        <div class="userInputItem"> \
          <label for="userTimestamp">Timestamp of where Description Happened:</label> \
          <div id="userTimestamp"> \
            <input name="hours" id="hours" type="number" min="0" max="59" inputmode="numeric"></input>: \
            <input name="mins" id="mins" type="number" min="0" max="59" inputmode="numeric"></input>: \
            <input name="secs" id="secs" type="number" min="0" max="59" inputmode="numeric"></input> \
          </div> \
          <div id="userTimestamp"> \
            <label for="hours">hours:</label> \
            <label for="mins">minutes:</label> \
            <label for="secs">seconds</label> \
          </div> \
        </div> \
 \
        <button>Add</button> \
      </form> \
    </div> \
  </div> \
  <button id="openModal">Save to Global Database</button> \
 \
  <!-- <button onclick="localStorage.clear()">Reset Saved/Local Storage</button> --> \
</body> \
')
