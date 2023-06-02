# touhou-song-sorter
manually merge sort your favourite touhou songs

## Developer notes

All of the song data is found at [src/fnc_data_song.js](./src/fnc_data_song.js), defined in the array `ary_SongData`. Each song's data is an array with a specific number of elements; for example:

```json
["The Sky Where Cherry Blossoms Flutter Down", new Set([TITLE.HSiFS]), "hsifs.png", "3B207i_YzE0", "Hidden Star in Four Seasons", "HSiFS", "Title Screen", ORIGINAL_TRACK, OTHER_THEME]
```

The elements, in order, are as follows:

0. Track name.
1. A set containing IDs of the titles that the track appears in
2. The filename within the `images/` folder for the title to which the track belongs.
3. YouTube video ID.
4. Game/album full name.
5. Game/album abbreviated name.
6. Where the track plays, or whose theme it is.
7. `ORIGINAL_TRACK` if this is the original release of the track, `ARRANGED_TRACK` if the track is rearranged from an earlier release.
8. `STAGE_THEME` if a stage-only theme, `BOSS_THEME` if a boss-only theme, `STAGE_AND_BOSS_THEME` if both, or `OTHER_THEME` otherwise.

### Adding new games/albums

* Add its title to `TITLE`.
* Add its image to the [images](./images/) folder (180x180 preferably).
