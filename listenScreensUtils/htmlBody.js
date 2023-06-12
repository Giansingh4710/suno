document.write('\
<link \
  rel="stylesheet" \
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" \
/> \
<nav class="topnav"> \
  <a href="/" class="active">Home</a> \
  <div class="dropdown"> \
    <button class="dropbtn"> \
      Keertan \
      <i class="fa fa-caret-down"></i> \
    </button> \
    <div class="dropdown-content"> \
      <a href="/Keertan/AkhandKeertan/">Akhand Keertan</a> \
      <a href="/Keertan/DarbarSahibPuratanKeertanSGPC" \
        >Darbar Sahib Puratan Keertan</a \
      > \
      <a href="/Keertan/TimeBasedKeertan(RaagKeertan)" \
        >Time Based Keertan (Raag Keertan)</a \
      > \
    </div> \
  </div> \
  <a href="/Paath/">Paath</a> \
  <a href="/SantGianiGurbachanSinghJiSGGSKatha/" \
    >Sant Giani Gurbachan Singh Ji SGGS Katha</a \
  > \
  <a href="/BhagatJaswantSinghJi/">Bhagat Jaswant Singh Ji</a> \
  <a href="/PanjGranthi(BhaiJaswantSinghJi)/">Panj Granthi</a> \
  <a href="/MiscellaneousTopics">Miscellaneous Topics</a> \
  <a href="http://keerat.xyz/TracksIndex/">Tracks Indexed</a> \
  <a \
    href="javascript:void(0);" \
    style="font-size: 15px" \
    class="icon" \
    onclick="toggleDropdown()" \
    >&#9776;</a \
  > \
</nav> \
 \
<body> \
  <h1 class="border" id="MainTitle"></h1> \
  <div id="forSearch" class="section"> \
    <input \
      placeholder="Search for Track:" \
      id="searchInput" \
      oninput="searchForShabad(this.value)" \
    /> \
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
      <audio \
        onended="playNextTrack()" \
        onerror="" \
        controls \
        autoplay="true" \
      ></audio> \
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
    <button class="basicBtn" id="saveTrackBtn">SAVE</button> \
    <div id="trackNavigationBtns"> \
      <button class="basicBtn trackNavBtn" onclick="playPreviousTrack()"> \
        &#8592; Previous \
      </button> \
      <button \
        class="basicBtn trackNavBtn" \
        onclick="playRandTrack()" \
        id="playRandomTrack" \
        autofocus \
      > \
        Random Track \
      </button> \
      <button class="basicBtn trackNavBtn" onclick="playNextTrack()"> \
        Next &rarr; \
      </button> \
    </div> \
  </div> \
 \
  <hr /> \
  <div id="optionMenu" class="section"> \
    <button \
      class="basicBtn" \
      id="toggleShowingOpts" \
      onclick="toggleShowingOpts()" \
    > \
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
  <div id="forSavedTracks" class="section"> \
    <button class="basicBtn" onclick="toggleSavedTracks()"> \
      Toggle Saved Tracks \
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
  <div id="myModal" class="modal"> \
    <div class="modal-content"> \
      <span class="close">&times;</span> \
      <label for="noteForSavedTrack" \
        >Enter a note if you would like (not needed):</label \
      > \
      <div> \
        <textarea \
          multiline \
          placeholder="ex: Amazing Bani at 10:00" \
          id="noteForSavedTrack" \
        ></textarea> \
      </div> \
      <div> \
        <button class="basicBtn" onclick="saveTrack()">Save</button> \
      </div> \
    </div> \
  </div> \
 \
  <!-- <button onclick="localStorage.clear()">Reset Saved/Local Storage</button> --> \
</body> \
')
