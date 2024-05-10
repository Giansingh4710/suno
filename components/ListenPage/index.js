"use client";

import NavBar from "../NavBar/index.js";
import ArtistsOptions from "./ArtistsOptions/index.js";
import TrackPlayback from "./TrackPlayback/index.js";
import SaveTrackModal from "./SaveTrackModal/index.js";
import SearchTracks from "./SearchTracks/index.js";
import IndexTrackBtnAndModal from "./IndexTrackModal/index.js";
import { useEffect, useMemo, useState } from "react";
import {
  getLinkFromOldUrlDate,
  getNameOfTrack,
  getObjFromUrl,
  getSecondsFromTimeStamp,
  validTrackObj,
} from "@/utils/helper_funcs.js";
import toast, { Toaster } from "react-hot-toast";
import { useSearchStore, useStore } from "@/utils/store.js";

export default function ListenPage({ title, allTheOpts, changesOpts }) {
  const prevTrack = useStore((state) => state.prevTrack);
  const nextTrack = useStore((state) => state.nextTrack);
  const setShuffle = useStore((state) => state.setShuffle);
  const setHistory = useStore((state) => state.setHistory);
  const history = useStore((state) => state.history);
  const hstIdx = useStore((state) => state.hstIdx);
  const setTracks = useStore((state) => state.setTracks);
  const setSearchInput = useSearchStore((state) => state.setSearchInput);
  const setTitle = useStore((state) => state.setTitle);

  const setTimeToGoTo = useStore((state) => state.setTimeToGoTo);
  const audioRef = useStore((state) => state.audioRef);
  const skipTime = useStore((state) => state.skipTime);

  useMemo(() => {
    setTitle(title);
    setTracks(allTheOpts);
  }, []);

  useEffect(() => {
    const currTrackData = history[hstIdx];
    if (validTrackObj(currTrackData)) {
      localStorage.setItem(
        `LastPlayed: ${title}`,
        JSON.stringify(currTrackData),
      );
      navigatorStuff();
    }
  }, [hstIdx]);

  useEffect(() => {
    function urlStuff() {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.size === 0) return false;

      const timeInS = getSecondsFromTimeStamp(urlParams.get("time"));
      setTimeToGoTo(timeInS)
      toast.success(`Time in Seconds from URL: ${timeInS}`);


      const urlSearch = urlParams.get("search");
      if (urlSearch) {
        setSearchInput(urlSearch);
        return true;
      }
      const theUrl = urlParams.get("url");
      const trkObj = getObjFromUrl(theUrl, allTheOpts);
      if (validTrackObj(trkObj)) {
        setHistory([trkObj]);
        return true;
      } else {
        // for old links that have 'artist','trackIndex'
        const artist = urlParams.get("artist");
        const trackIndex = urlParams.get("trackIndex");
        const url = getLinkFromOldUrlDate(artist, trackIndex, allTheOpts);
        const trkObj = getObjFromUrl(url, allTheOpts);
        if (validTrackObj(trkObj)) {
          toast("Old copied link");
          setHistory([trkObj]);
          return true;
        }
      }
      // toast.error(`${theUrl}: Not from this page`, { duration: 10000 })
      return false;
    }

    function getLastPlayedTrackLocalStorage() {
      try {
        const strData = localStorage.getItem(`LastPlayed: ${title}`); // localStorage.getItem('LastPlayed: Welcome to Rimmy Radio')
        const trkObj = JSON.parse(strData);
        if (!validTrackObj(trkObj)) {
          throw new Error("Invalid track object from local storage");
        }
        setHistory([trkObj]);
        const localStorageTime = localStorage.getItem(`LastTime: ${title}`);
        const timeInS = getSecondsFromTimeStamp(localStorageTime);
        setTimeToGoTo(timeInS)
        return true;
      } catch (e) {
        toast.error(e.message, { duration: 1000 });
        return false;
      }
    }

    function getShuffle() {
      if (localStorage.getItem("shuffle") === "true") setShuffle(true);
    }

    getShuffle();
    if (!urlStuff()) {
      if (!getLastPlayedTrackLocalStorage()) {
        // nextTrack()
      }
    }
  }, []);

  //to get rid of next.js Hydration error
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);
  if (!showChild) return <body />;

  function navigatorStuff() {
    navigator.mediaSession.setActionHandler("play", () =>
      audioRef.current.play(),
    );
    navigator.mediaSession.setActionHandler("pause", () =>
      audioRef.current.pause(),
    );

    navigator.mediaSession.setActionHandler("seekforward", () => {
      audioRef.current.currentTime += skipTime;
    });
    navigator.mediaSession.setActionHandler(
      "seekbackward",
      () => (audioRef.current.currentTime += skipTime * -1),
    );
    navigator.mediaSession.setActionHandler("previoustrack", prevTrack);
    navigator.mediaSession.setActionHandler("nexttrack", nextTrack);

    navigator.mediaSession.setActionHandler("seekto", function (event) {
      audioRef.current.currentTime = event.seekTime;
    });

    let album = history[hstIdx].type;
    album = album === "main" || album === "other" ? title : album;
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: getNameOfTrack(history[hstIdx].link),
        artist: history[hstIdx].artist,
        album: album,
      });
    }
  }

  // here

  return (
    <body className="w-full h-full bg-primary-100" >
      <Toaster position="top-left" reverseOrder={true} />
      <NavBar title={title} />
      <SearchTracks />
      <SaveTrackModal />
      <ArtistsOptions />
      <TrackPlayback />
      {/*
        <ChangeColorsModal />
      */}
      <IndexTrackBtnAndModal />
    </body>
  );
}
