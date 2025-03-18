import StudentJoin from "./StudentJoin";
import TutorDashboard from "./TutorDashboard";
import UploadVideo from "./UploadVideo";
import VideoList from "./VideoList";

function Video() {
  return (
    <div>
      <h1>Plateforme de Streaming</h1>
      <UploadVideo />
      <VideoList />  
      <TutorDashboard />
      <StudentJoin />
    </div>
  );
}

export default Video;
