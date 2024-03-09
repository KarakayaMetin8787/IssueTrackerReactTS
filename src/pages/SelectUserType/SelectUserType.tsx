import { Link } from "react-router-dom";
import "./SelectUserType.scss";
import { useLoginContext } from "../../context/LoginContext";
import { useEffect, useState } from "react";

const SelectUserType = () => {

  const { fetchLoginData } = useLoginContext();
  const [classSuperToggle, setClassSuperToggle] = useState("super")
  const [classAdminToggle, setClassAdminToggle] = useState("admin")

  if (!fetchLoginData) {
    return null; // evtl ladebildschirm hier hinzufügen?
  }
// console.log(fetchLoginData);

  useEffect(() => {
    if (fetchLoginData.type === "super") {
      setClassSuperToggle("");
      setClassAdminToggle("")
    } else if (fetchLoginData.type === "admin") {
      setClassAdminToggle("")
    }
  }, [fetchLoginData]);

  return (
    <div className="SelectUserTypeContainer">
      <h2 className="welcomingText">{`Willkommen `+ fetchLoginData.vorname + " " + fetchLoginData.nachname}</h2>
      <div className="ContainerSelectElements">
        <Link className="dev" to="/dev">Weiter als Developer</Link>
        <Link className={`adminSibling ${classAdminToggle}`} to="/admin">Weiter als Admin</Link>
        <Link className={`superSibling ${classSuperToggle}`} to="/superadmin">Weiter als Super Admin</Link>
      </div>
    </div>
  );
};

export default SelectUserType;
