# Payload to create a room
{
    "action": "createRoom",
    "name": "Mehdi"
}

Response:
{
    "message": "You are now connected to room 0e30c7c9",
    "type": "info"
}

# Payload to join a room
{
    "action": "joinRoom",
    "name": "John",
    "roomCode": "0e30c7c9"
}

Response:
{"message":"You are now connected to room 0e30c7c9","type":"info"}

# Payload to send message:
{
    "action": "message",
    "message": "Hello, how are you?"
}
