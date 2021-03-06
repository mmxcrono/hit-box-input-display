# hit-box-input-display

Browser input display of Hit Box arcade controllers

## OBS Studio instructions

### Window Capture Source

1. Open up the **index.html** page in a web browser
2. Add a new source for **Window Capture**
3. Choose **Create new** and a name you like such as **Hit Box Input Display** and click **OK**
4. For the Window choose the web browser where **index.html** is open and click **OK**
5. In the sources for the scene right-click the one you just added and click on **Filters**
6. Add a new filter for **Crop/Pad**
7. Increase the **Top** and **Bottom** values to clean up the input display as you like and click **Close**
8. Position your display and size it however you like in your overlay

### Browser Source and Suggested Values

1. Add a new source for **Browser**
2. Choose **Create new** and a name you like such as **Hit Box Input Display** and click **OK**
3. Check the box for **Local file**
4. Click on **Browse** and select the **index.html** file
5. Set the **Height** and **Width** to 1000
6. Delete the text inside **Custom CSS**
7. Click **OK**
8. In the sources for the scene right-click the one you just added and click on **Filters**
9. Add a new effect filter for **Crop/Pad**
10. Set the **Bottom** value to 550 and click **Close**
11. Position your display and size it however you like in your overlay

- Note that using Browser Source will not allow changing the theme or logo position
