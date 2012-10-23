#pragma strict

var numActivated : int;
var totalLZ : int;

var winClip : AudioClip;
var loseClip : AudioClip;

var guiMode : String = "InGame";

var levelScore : int;
var scoreText : GUIText;
var scoretext_Total : GUIText;

var winTexture : GUITexture;
var loseTexture : GUITexture;

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
	// If the Player has achieved a win state
	if(guiMode == "Win")
	{
		// size and postion of the button to centre
		if(GUI.Button(Rect(Screen.width/2-75,Screen.height/2-20,150,30),"Next Level"))
		{
			// needs to be set back to one as is carried over from level to level.
			Time.timeScale = 1;
			// loads next level in the series
			Application.LoadLevel(Application.loadedLevel+1);
			guiMode = "InGame";
			print("Loading Next Level");
		}
		
		if(GUI.Button(Rect(Screen.width/2-75,Screen.height/2+20,150,30),"Quit to Main Menu"))
		{
			Time.timeScale = 1;
			Application.LoadLevel(0);
			print("Quiting...");
		}
	}
	// if the Player has unfortuantly lost
	if(guiMode == "Lose")
	{
		// size and postion of the button to centre
		if(GUI.Button(Rect(Screen.width/2-75,Screen.height/2-20,150,30),"Retry?"))
		{
			// needs to be set back to one as is carried over from level to level.
			Time.timeScale = 1;
			Application.LoadLevel(Application.loadedLevel);
			guiMode = "InGame";
			print("Reloading Level...");
		}
		
		if(GUI.Button(Rect(Screen.width/2-75,Screen.height/2+20,150,30),"Quit to Main Menu"))
		{
			Time.timeScale = 1;
			Application.LoadLevel(0);
			print("Quiting...");
		}
	}
}

function LZActivated()
{
	// updating the score
	levelScore +=500;
	// displaying the score
	scoreText.text = "score - "+levelScore;
	
	numActivated ++;
	// check if number of stations activated is total number
	if(numActivated == totalLZ)
	{
		Win();
	}
	print("Activated");
}

function Win()
{
	//set audio to a certain clip
	audio.clip = winClip;
	audio.Play();
	
	//saves the player level
	PlayerPrefs.SetInt("playerLevel", Application.loadedLevel+1);
	
	if(PlayerPrefs.HasKey("playerTotalScore"))
	{
		PlayerPrefs.SetInt("playerTotalScore", PlayerPrefs.GetInt("playerTotalScore") + levelScore);
	}
	else
	{
		PlayerPrefs.SetInt("playerTotalScore", levelScore);
	}
	
	// save player data
	PlayerPrefs.Save();
	
	// display the total score at the end of the level
	scoretext_Total.text = "Total Score - "+PlayerPrefs.GetInt("playerTotalScore");
	scoretext_Total.enabled = true;
	
	// displays texture
	winTexture.enabled = true;
	
	Time.timeScale = 0;
	guiMode = "Win";	
}

function Lose()
{
	// wait for a certain amount of seconds to allow for explosion before freezing the game.
	yield(WaitForSeconds(3));
	
	audio.clip = loseClip;
	audio.Play();
	
	// displays texture
	loseTexture.enabled = true;
	
	Time.timeScale = 0;
	guiMode = "Lose";
}
