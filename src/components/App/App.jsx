/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Header from "../Header/Header";
import HomePage from "../HomePage/HomePage";
import ErrorPage from "../ErrorPages/ErrorPage";
import LoginPage from "../LoginPage/LoginPage";
import SignUpPage from "../SignUpPage/SignUpPage";
import LegalMention from "../LegalMention/LegalMention";
import Contact from "../Contact/Contact";
import About from "../About/About";
import UserPage from "../UserPage/UserPage";
import GiverBoard from "../GiverBoard/GiverBoard";
import TeamPage from "../TeamPage/TeamPage";
import Categories from "../Categories/Categories";
import LeaderBoard from "../LeaderBoard/LeaderBoard";
import TaskerBoard from "../TaskerBoard/TaskerBoard";
import MemberPage from "../MemberPage/MemberPage";
import TeamMembersList from "../TeamMembersList/TeamMembersList";
import TasksListPage from "../TasksListPage/TasksListPage";
import TaskCreator from "../TaskCreator/TaskCreator";
import TaskDetail from "../TaskDetail/TaskDetail";
import Footer from "../Footer/Footer";
import AccessDeniedPage from "../ErrorPages/AccessDenied";

import { fetchTasksById } from "../../api/apiTasks";
import fetchUsersById, { fetchUserProfil } from "../../api/apiUsers";
import fetchMembersById from "../../api/apiMembers";
import { fetchTeamsUser } from "../../api/apiUsers";
import fetchCategoriesByTeamId from "../../api/apiCategories";
import { IdFromUrl } from "../TeamPage/TeamPage";

import "../../styles/_reset.scss";
import "./App.scss";


const App = () => {
  // eslint-disable-next-line no-unused-vars
  // const urlApi = "http://jeremylamacq-server.eddi.cloud/api"
  const urlApi = "http://127.0.0.1:8080"

  const [token, setToken] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [teamId, setTeamId] = useState(parseInt(null, 10));
  const [userProfil, setUserProfil] = useState(null);
  const [roles, setRoles] = useState("");
  const [userId, setUserId] = useState('');
  const [teamRoles, setTeamRoles] = useState(['']);
  const [memberTeams, setMemberTeams] = useState([]);

  const maxTableRows = 7;
  
  useEffect(() => {
    const teamFound = memberTeams.find((team) => team.team.id === teamId);

    if (teamFound) {
      const teamRoles = teamFound.teamRoles;
      setTeamRoles(teamRoles);
    } 
  }, [memberTeams, teamId]); 

  ()  => {
     const teamIdFromUrl = IdFromUrl();
     if (IdFromUrl) {
       setTeamId(teamIdFromUrl);
     } else {
       setTeamId(parseInt(null, 10))
     }
   }

  /***********Access authorisation ************/

    const foundTeamRoles = teamRoles[0];  
    const urlTeamRole = foundTeamRoles.toLowerCase();

  /*************** User Login & Logout  *****************/
   
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  /**
   * 
   * @param {*} email 
   * @param {*} password 
   */
  const handleLogin = async (email, password) => {
    try {
      const response = await fetch(`${urlApi}/api/login_check`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Connexion réussie");
        setToken(data.token);
        localStorage.setItem("token", data.token);
        setIsLogin(true);

        navigate("/utilisateur");
      } else {
        console.error("Échec de la connexion.", await response.json());
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  /**
   * 
   */
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setIsLogin(false);

    navigate("/");
  };
  /************************** teamId to localStorage ***************************/

  useEffect(() => {
    if (teamId !== null && !isNaN(teamId)) {
      localStorage.setItem("teamId", teamId.toString());
    }
  }, [teamId]);

  useEffect(() => {
    const storedTeamId = localStorage.getItem("teamId");
    console.log (storedTeamId);
    if (storedTeamId !== null) {
      setTeamId(parseInt(storedTeamId, 10));
    }
  }, []);

  

  /***************************   TasksList recovery *****************************/
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasksData = async () => {
      if (teamId) {
        if (token) {
          const fetchedTasks = await fetchTasksById(teamId, token);
          setTasks(fetchedTasks);
        }
      }
    };
    fetchTasksData();
  }, [token, teamId]);


  /**************************   UsersList recovery ****************************/
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      if (token) {
        const fetchedUsers = await fetchUsersById(token);
        setUsers(fetchedUsers);
      }
    };
    fetchUsersData();
  }, [token, teamId]);

  /* Get User Profil and return the Role User or Admin */

  useEffect(() => {
    const fetchUsersProfilData = async () => {
      if (token) {
        const fetchedUserProfil = await fetchUserProfil(token);
        setUserProfil(fetchedUserProfil);

        if (fetchedUserProfil[0].roles) {
          if (fetchedUserProfil[0].roles.includes("ROLE_USER")) {
            setRoles("ROLE_USER"); 
            setMemberTeams(fetchedUserProfil[0].belongsTos)
            
          }
        }
        if (fetchedUserProfil[0].id) {
          setUserId(fetchedUserProfil[0].id)
        }
      }
    };
    fetchUsersProfilData();
  }, [token]);

  /**************************   MembersList recovery ****************************/
  const [members, setMembers] = useState([]);
  
  useEffect(() => {
    const fetchMembersData = async () => {
      if (teamId) {
        if (token) {
          const fetchedUsers = await fetchMembersById(teamId, token,);
          setMembers(fetchedUsers);
        } 
      }
    };
    fetchMembersData();
  }, [token, teamId]);

  /****************************  TeamsList recovery *****************************/
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeamsUserData = async () => {
      if (userId) {
        if (token) {
          const fetchedTeamsUser = await fetchTeamsUser(userId, token);
          setTeams(fetchedTeamsUser);
        }
      }
    };
    fetchTeamsUserData();
  }, [token, userId, setTeams]);

  /************************* CategoriesList recovery ****************************/

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      if (teamId) {
        if (token) {
          const fetchedCategories = await fetchCategoriesByTeamId(teamId, token);
          setCategories(fetchedCategories);
        }
      }
    };
    fetchCategoriesData();
  }, [token, teamId]);

  /*************************************************************************** */

  return (
    <>
      <Header isLogin={isLogin} logout={handleLogout} teamId={teamId} token={token} userProfil={userProfil} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route
          path="/connexion"
          element={
            <LoginPage
              onSubmit={handleLogin}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          }
        />
        <Route path="/inscription" element={<SignUpPage />} />
        <Route path="/mentions-legales" element={<LegalMention />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/a-propos" element={<About />} />
        <Route
          path="/utilisateur"
          element={
            roles.includes("ROLE_USER") ? (
              <UserPage 
                teams={teams}
                setTeams={setTeams} 
                token={token}
                teamId={teamId}
                setTeamId={setTeamId}
                userId={userId}
                userProfil={userProfil}
                teamRoles={teamRoles}
                />
            ) : (
              <AccessDeniedPage to="/access-denied" replace={true} />
            )
          }
        />
        <Route
          path="/equipes/:id"
          element={
            roles.includes("ROLE_USER") ? (
              <TeamPage 
                members={members} 
                maxTableRows={maxTableRows} 
                token={token}
                teams={teams} 
                teamId={teamId}
                setTeamId={setTeamId}
                urlTeamRole={urlTeamRole}
                />
            ) : (
              <AccessDeniedPage to="/access-denied" replace={true} />
            )
          }
        />
        <Route
          path="/equipes/:id/leaderboard"
          element={
            (roles.includes("ROLE_USER") && teamRoles.includes("LEADER")) ? (
              <LeaderBoard
                setMembers={setMembers}
                members={members}
                categories={categories}
                setCategories={setCategories}
                tasks={tasks}
                maxTableRows={maxTableRows}
                token={token}
                teamId={teamId}
                setTeamId={setTeamId}
                teams={teams}
                teamRoles={teamRoles}
                urlTeamRole={urlTeamRole}
              />
            ) : (
              <AccessDeniedPage to="/access-denied" replace={true} />
            )
          }
        />
        <Route
          path="/equipes/:id/giverboard"
          element={
            roles.includes("ROLE_USER") &&
            (teamRoles.includes("GIVER") || teamRoles.includes("LEADER")) ? (
              <GiverBoard
                tasks={tasks}
                members={members}
                maxTableRows={maxTableRows}
                urlTeamRole={urlTeamRole}
                teamId={teamId}
              />
            ) : (
              <AccessDeniedPage to="/access-denied" replace={true} />
            )
          }
        />
        <Route
          path="/equipes/:id/taskerboard"
          element={
            roles.includes("ROLE_USER") &&
            (teamRoles.includes("TASKER") || teamRoles.includes("LEADER")) ? (
              <TaskerBoard 
                tasks={tasks} 
                setTasks= {setTasks}
                maxTableRows={maxTableRows} 
                urlTeamRole={urlTeamRole} 
                teamId={teamId}
                token = {token}
              />
            ) : (
              <AccessDeniedPage to="/access-denied" replace={true} />
            )
          }
        />
        <Route
          path="/equipes/:id/categories"
          element={
            roles.includes("ROLE_USER") ? (
              <Categories 
                categories={categories} 
                token={token}
                setCategories={setCategories}
                teamId={teamId}
                />
            ) : (
              <AccessDeniedPage to="/access-denied" replace={true} />
            )
          }
        />
        <Route
          path="/equipes/:id/membres/:id"
          element={
            roles.includes("ROLE_USER") ? (
              <MemberPage tasks={tasks} 
                members={members} 
                teamRoles={teamRoles} 
                maxTableRows={maxTableRows} 
                urlTeamRole={urlTeamRole}/>
            ) : (
              <AccessDeniedPage to="/access-denied" replace={true} />
            )
          }
        />
        <Route
          path="/equipes/:id/membres/:role?"
          element={
            roles.includes("ROLE_USER") ? (
              <TeamMembersList 
                members={members} 
                setMembers={setMembers}
                categories={categories}
                urlTeamRole={urlTeamRole}
                teamId={teamId} 
                token={token}
              />
            ) : (
              <AccessDeniedPage to="/access-denied" replace={true} />
            )
          }
        />
        <Route
          path="/equipes/:id/taches/:role?"
          element={
            roles.includes("ROLE_USER") ? (
              <TasksListPage tasks={tasks} teamId={teamId} teamRoles={teamRoles}/>
            ) : (
              <AccessDeniedPage to="/access-denied" replace={true} />
            )
          }
        />
        <Route
          path="/equipes/:id/taches/ajouter"
          element={
            roles.includes("ROLE_USER") &&
            (teamRoles.includes("GIVER") || teamRoles.includes("LEADER")) ? (
              <TaskCreator token={token} categories={categories} members={members} teamId={teamId} />
            ) : (
              <AccessDeniedPage to="/access-denied" replace={true} />
            )
          }
        />
        <Route

          path="/equipes/:id/taches/:id/:role?"
          element={
            roles.includes("ROLE_USER") ? (
              <TaskDetail token={token} categories={categories} members={members} teamId={teamId} teamRoles={teamRoles}/>

            ) : (
              <AccessDeniedPage to="/access-denied" replace={true} />
            )
          }
        />
        <Route path="/access-denied" element={<AccessDeniedPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
