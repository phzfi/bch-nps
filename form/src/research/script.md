# script source

It's not possible to link and execute external JavaScript file hosted on GitHub, that is hotlinking i.e. "the act of linking to a file that is hosted on another site, instead of downloading the file, hosting it on your own server, and providing proper citation. Images are most frequently hotlinked, but audio files, movies, flash animations, and other digital assets can also be hotlinked", "Hotlinking is known as the act of stealing someone's bandwidth by linking directly to their website's assets".
Using the row version of a js file on github does not work, github protects it. A workaround is to use a CDN i.e. a content delivery network to serve the js file or mirror the github link. A better solution is to host the js file for example on Netlify. When you build a project, you can see the js and css url with inspect tool:

For a <script> src:
  
  
![Screenshot 2022-04-13 at 16 07 30](https://user-images.githubusercontent.com/88823568/163187374-cc516ffc-5571-4975-bef3-5e4a243014f0.png)
  
  
For css:
![Screenshot 2022-04-13 at 16 07 43](https://user-images.githubusercontent.com/88823568/163187389-c83be93e-bc16-45d2-bb61-1ba312002c36.png)

See Stackoverflow: 
- https://stackoverflow.com/questions/14033281/including-javascript-files-from-github-into-html-pages
- https://stackoverflow.com/questions/20311271/hotlink-resources-like-javascript-files-directly-from-github/20311329#20311329

## Hosting

The best solution is to host the js for example on Netlify
