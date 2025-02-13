import { useEffect, useState } from "react";
import { useGetUserApplicationsQuery } from "../slices/applicationApiSlice";
import { useSelector } from "react-redux";

const ResumeScreen = () => {
  const { data, error, isLoading } = useGetUserApplicationsQuery();
  console.log(data);
  const [name, setName] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name || "N/A");
    }
  }, [userInfo]);

  if (isLoading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return ( <div className="text-center mt-5 text-danger"> Error: {error?.message || "An unknown error occurred"} </div> );

  const applications = data?.application || [];
  const badgesCount = userInfo?.badges?.length || 0;

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="profile-image">K</div>
              <h4 className="card-title">{name}</h4>
              <p className="text-muted">{userInfo?.bio || "No bio available"}</p>
              <center>
                <a
                  href="https://g.dev/kaushalg47"
                  className="text-decoration-none mb-3 d-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  g.dev/kaushalg47
                </a>
              </center>
              <div className="d-flex align-items-center mb-2">
                <span className="me-2">📍</span>
                <span className="text-muted">{userInfo?.location || "Not provided"}</span>
              </div>
              <div className="d-flex align-items-center">
                <span className="me-2">🏆</span>
                <span className="text-muted">{badgesCount} badge(s)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card shadow-sm h-100">
            <div className="card-body equal-height">
              <h5 className="card-title">Achievements</h5>
              <div className="achievement-stats">
                <div className="row w-100">
                  {[
                    { title: "Badges", count: badgesCount },
                    { title: "Courses", count: 3 }, // Replace with dynamic data
                    { title: "Internships", count: 2 }, // Replace with dynamic data
                  ].map((achievement, index) => (
                    <div className="col-md-4" key={index}>
                      <div className="card bg-light h-100">
                        <div className="card-body text-center">
                          <h3>{achievement.count}</h3>
                          <p className="mb-0">{achievement.title}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h5 className="mb-3">Favorite Badges</h5>
        <div className="row g-3">
          {[
            { title: "Android Studio User", date: "Nov 2, 2021" },
            { title: "First Learning", date: "Aug 8, 2021" },
          ].map((badge, index) => (
            <div className="col-md-3" key={index}>
              <div className="card shadow-sm text-center">
                <div className="card-body">
                  <h6 className="card-title">{badge.title}</h6>
                  <p className="text-muted small">{badge.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h5 className="mb-3">In Progress</h5>
        <div className="row">
          <div className="col-md-3">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <h6 className="card-title">Codelab in Progress</h6>
                <p className="text-muted small">In Progress</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h5 className="mb-3">Applied Jobs</h5>
        {applications.length > 0 ? (
          <div className="row">
            {applications.map((application) => (
              <div className="col-md-4 mb-3" key={application._id}>
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h6 className="card-title">{application.job?.title || "N/A"}</h6>
                    <p className="text-muted small">
                      Company: {application.job?.company || "N/A"}
                    </p>
                    <p className="text-muted small">Status: {application.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Not applied for any jobs yet</p>
        )}
      </div>
    </div>
  );
};

export default ResumeScreen;
