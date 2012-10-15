var forwardSpeed : float = 3;
var turnSpeed : float = 2;

function Update () 
{
	var forwardMoveAmount = Input.GetAxis("Vertical")*forwardSpeed;
	
	var turnAmount = Input.GetAxis("Horizontal")*turnSpeed;
	
	transform.Rotate(0,turnAmount,0);
	
	rigidbody.AddRelativeForce(forwardMoveAmount,0,0);
}