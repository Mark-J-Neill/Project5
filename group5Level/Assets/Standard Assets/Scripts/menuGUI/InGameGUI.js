#pragma strict

var guiMode : String = "InGame";

var buttonWidth : int = 180;


function Update()
{
	// Pause button
	if(Input.GetKeyDown("escape"))
	{
		//print("Paused");
		//this is to completely pause all buttons and particles
		Time.timeScale = 0;
		//bring up menu options.
		guiMode = "Paused";		
	}
}

function OnGUI()
{
	if(guiMode == "Paused")
	{
		// size and postion of the button to centre
		if(GUI.Button(Rect(Screen.width/2-(buttonWidth/2),Screen.height/2-20,buttonWidth,30),"Resume"))
		{
			// needs to be set back to one as is carried over from level to level.
			Time.timeScale = 1;
			guiMode = "InGame";
			print("Resume...");
		}
		
		if(GUI.Button(Rect(Screen.width/2-(buttonWidth/2),Screen.height/2+20,buttonWidth,30),"Quit to Main Menu"))
		{
			// loads the level 0 from the build settings
			Time.timeScale = 1;
			Application.LoadLevel(0);			
			print("Quiting...");
		}
		
		//if(GUI.Button(Rect(Screen.width/2-(buttonWidth/2),Screen.height/2-20,buttonWidth,30), "Quit Game"))
		//{
		//	Time.timeScale = 1;
		//	Application.Close();
		//	print("Exiting...");
		//}
	}
}
