import { Link, useNavigate } from "react-router-dom";
import { useElection } from "@/lib/electionContext";
import { Button } from "@/components/ui/button";
import { LogOut, Shield, Vote, Users, Home } from "lucide-react";
import eskLogo from "@/assets/esk.png";

const Header = () => {
  const { isLoggedIn, isAdmin, teacherName, logout } = useElection();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-gradient-navy border-b border-navy-light/30">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full overflow-hidden shadow-gold">
            <img src={eskLogo} alt="School logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-primary-foreground font-display text-lg font-bold leading-tight">
              ESK Prefects Election

            </h1>
            
          </div>
        </Link>

        <nav className="flex items-center gap-1">
          {isLoggedIn && <>
              <Link to="/candidates">
                <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
                  <Users className="w-4 h-4 mr-1.5" />
                  Candidates
                </Button>
              </Link>
              <Link to="/vote">
                <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
                  <Vote className="w-4 h-4 mr-1.5" />
                  Vote
                </Button>
              </Link>
              {isAdmin &&
            <Link to="/admin">
                  <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
                    <Shield className="w-4 h-4 mr-1.5" />
                    Admin
                  </Button>
                </Link>
            }
            </>
          }
          {isLoggedIn ?
          <div className="flex items-center gap-2 ml-2 pl-2 border-l border-primary-foreground/20">
              <span className="text-primary-foreground/70 text-sm hidden sm:inline">{teacherName}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
                <LogOut className="w-4 h-4" />
              </Button>
            </div> :

          <Link to="/login">
              <Button size="sm" className="bg-gradient-gold text-secondary-foreground font-semibold hover:opacity-90 shadow-gold">
                Login
              </Button>
            </Link>
          }
        </nav>
      </div>
    </header>);

};

export default Header;