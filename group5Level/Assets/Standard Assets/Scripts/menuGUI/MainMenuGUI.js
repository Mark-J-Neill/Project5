#pragma strict

// anything in script will happen in edit mode, can cause some problems with function update/start, GUI works fine
@script ExecuteInEditMode()

var myGUI : GUISkin;

var buttonWidth : int = 180;

function OnGUI()
{
	GUI.skin = myGUI;
	// size and postion of the button to centre
	if(GUI.Button(Rect(Screen.width/2-(buttonWidth/2),Screen.height/2-20,buttonWidth,30),"New Game"))
	{
		// clears PlayerPrefs data
		PlayerPrefs.DeleteAll();
		// sets the continue button at level one if it appears.
		PlayerPrefs.SetInt("playerLevel", 1);
		// Load first level
		Application.LoadLevel(1);
		print("Loading...");
	}
	if(PlayerPrefs.HasKey("playerLevel"))
	{
		if(GUI.Button(Rect(Screen.width/2-(buttonWidth/2),Screen.height/2+20,buttonWidth,30),"Continue Game"))
		{
			//retrive the player level and load that into the game
			Application.LoadLevel(PlayerPrefs.GetInt("playerLevel"));
			
			print("Loading Previous...");
		}
	}
}