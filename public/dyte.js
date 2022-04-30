const client = new DyteClient({ clientId: "26256cf7-82ee-4591-b5f9-439021d2a672|35910a467154f6ef700c" });
  const meeting = client.Meeting({
    roomName: "",
    authToken: "",
  });
  meeting.init("root");