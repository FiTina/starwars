# Star Wars Character Table

## Summary

This application allows you to keep track of your favorite Star Wars characters (and yes, we made sure to leave Rey
out). Three predefined characters are displayed on the screen along with their essential data. By clicking on any
character, you can either replace them with another (e.g., swap Anakin Skywalker for Darth Vader) or modify their
characteristics (just... please, don’t go full Disney and make Princess Leia something she’s not).
Don’t worry—if you close the browser, your changes will be safely preserved by the force and will still be there the
next time you open it. If you want to reset everything back to the default settings, simply use private mode (but
remember, an empty browser history might say more about you than a full one).

## Technical Details

When the application is first launched, it fetches data for 22 Star Wars characters. I wanted to fetch at least the
characters you used on the Figma sample, while avoiding overwhelming the server (I ran into some tricky CORS issues
while testing). The requisite was to take a subset anyway, I hope it is big enough. This means the initial run might
take a bit longer, but after that, everything should be fast. I implemented parallel API calls to speed things up, but
the server seems to throttle them. Accessing the `/people` endpoint is quicker; however, it’s limited to 10 results per
request, so it wasn’t viable for including characters like Yoda.
One small quirk: if you request the character with ID 17, a 404 error will occur because that ID doesn’t exist. I know I
could have hidden the error from the console, but since it’s a server-side issue, I figured it was better to let it
be. (Or maybe ID 17 really _is_ Rey and someone wisely chose to keep her out of the force—I’ll leave it to you to
decide).
Once fetched, character data is stored in both `localStorage` and class properties, along with the names of the
characters displayed on screen. Both the character list and the visible names are persisted with every change.
When selecting a new character, the app prevents any invalid names (names are restricted to the fetched characters).
Additionally, you can’t choose a character that’s already being displayed.

## Code Notes

I’ve tried to make the code as self-explanatory as possible. When something might be unclear, I’ve added comments, but
avoided overloading the code with them when the intent was already clear. I know there are parts that could be more
elegant or less "hacky," but I’ve done my best with minimal experience using these frameworks. As mentioned in my CV,
I’m fairly familiar with plain TypeScript, but had never worked with any frontend framework before this week. This is
the best I could achieve with what I’ve managed to learn since Monday.

It’s late now, almost midnight, and I’m running out of time (“I love deadlines. I love the whooshing noise they make as
they go by.” —Douglas Adams). If it wasn't for the daylight saving time change, I would have finished it earlier.

### Live long and prosper!

(Just kidding—May the force be with you!)

P.S. We love Spock too.
