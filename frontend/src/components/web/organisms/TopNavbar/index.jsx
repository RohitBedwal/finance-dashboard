import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./styles";
import ProfileBlock from "../../molecules/ProfileBlock/index";
import PageHeader from "../../molecules/Pageheader";
import Sidebar from "../Sidebar/index";
import {
  getActiveProfile,
  getProfiles,
  setActiveProfile,
  subscribeStorage,
} from "../../../../utils/localStorage";

const TopNavbar = () => {
  const DRAWER_TRANSITION_MS = 280;
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const [profiles, setProfiles] = useState([]);
  const [activeProfile, setActiveProfileState] = useState(getActiveProfile());
  const [mobileSidebarState, setMobileSidebarState] = useState("closed");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const mobileSidebarStateRef = useRef(mobileSidebarState);
  const closeTimeoutRef = useRef(null);
  const openFrameRef = useRef(null);
  const searchDebounceRef = useRef(null);
  const searchPanelRef = useRef(null);
  const searchInputRef = useRef(null);

  const isMobileSidebarVisible = mobileSidebarState !== "closed";
  const isMobileSidebarOpen = mobileSidebarState === "open";
  const isMobileSidebarClosing = mobileSidebarState === "closing";

  useEffect(() => {
    mobileSidebarStateRef.current = mobileSidebarState;
  }, [mobileSidebarState]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get("q") || "");
  }, [location.search]);

  useEffect(() => {
    const loadProfiles = () => {
      setProfiles(getProfiles());
      setActiveProfileState(getActiveProfile());
    };

    loadProfiles();
    return subscribeStorage(loadProfiles);
  }, []);

  const handleProfileChange = (profileId) => {
    setActiveProfile(profileId);
  };

  const openMobileSidebar = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (openFrameRef.current) {
      cancelAnimationFrame(openFrameRef.current);
      openFrameRef.current = null;
    }

    setMobileSidebarState("opening");
    openFrameRef.current = requestAnimationFrame(() => {
      setMobileSidebarState("open");
      openFrameRef.current = null;
    });
  }, []);

  const closeMobileSidebar = useCallback(() => {
    const currentState = mobileSidebarStateRef.current;
    if (currentState === "closed" || currentState === "closing") return;

    if (openFrameRef.current) {
      cancelAnimationFrame(openFrameRef.current);
      openFrameRef.current = null;
    }

    setMobileSidebarState("closing");
    closeTimeoutRef.current = setTimeout(() => {
      setMobileSidebarState("closed");
      closeTimeoutRef.current = null;
    }, DRAWER_TRANSITION_MS);
  }, []);

  useEffect(() => {
    closeMobileSidebar();
  }, [pathname, closeMobileSidebar]);

  useEffect(() => {
    setIsSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isSearchOpen) return;

    const handleOutsideClick = (event) => {
      if (searchPanelRef.current && !searchPanelRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isSearchOpen]);

  useEffect(() => {
    if (!isSearchOpen) return;
    const frame = requestAnimationFrame(() => {
      searchInputRef.current?.focus();
    });

    return () => cancelAnimationFrame(frame);
  }, [isSearchOpen]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
      if (openFrameRef.current) {
        cancelAnimationFrame(openFrameRef.current);
      }
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current);
      }
    };
  }, []);

  const navigateToTransactionSearch = (rawQuery, shouldReplace = false) => {
    const nextQuery = String(rawQuery || "").trim();
    if (!nextQuery) {
      navigate("/transactions", { replace: shouldReplace });
      return;
    }

    const params = new URLSearchParams();
    params.set("q", nextQuery);
    navigate(`/transactions?${params.toString()}`, { replace: shouldReplace });
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (pathname !== "/transactions") return;

    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    searchDebounceRef.current = setTimeout(() => {
      navigateToTransactionSearch(value, true);
    }, 220);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }
    navigateToTransactionSearch(searchTerm, pathname === "/transactions");
    setIsSearchOpen(false);
  };

  const handleSearchClear = () => {
    setSearchTerm("");
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }
    navigateToTransactionSearch("", pathname === "/transactions");
  };

  return (
    <>
      <S.Container>
        <S.DesktopPageHeaderSlot>
          <PageHeader />
        </S.DesktopPageHeaderSlot>

        <S.Actions>
          <S.SearchArea ref={searchPanelRef}>
            <S.IconButton
              type="button"
              aria-label="Open search"
              title="Search"
              onClick={() => setIsSearchOpen((prev) => !prev)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="6.8" stroke="currentColor" strokeWidth="1" />
                <path d="M16.4 16.4L21 21" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </S.IconButton>

            <S.SearchDropdown $open={isSearchOpen}>
              <S.SearchForm onSubmit={handleSearchSubmit}>
                <S.SearchInput
                  ref={searchInputRef}
                  type="search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search transactions"
                  aria-label="Search transactions"
                />

                {searchTerm ? (
                  <S.ClearSearchButton
                    type="button"
                    onClick={handleSearchClear}
                    aria-label="Clear search"
                    title="Clear"
                  >
                    ✕
                  </S.ClearSearchButton>
                ) : null}

                <S.SearchSubmitButton type="submit" aria-label="Search transactions" title="Search">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11" cy="11" r="6.8" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M16.4 16.4L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </S.SearchSubmitButton>
              </S.SearchForm>
            </S.SearchDropdown>
          </S.SearchArea>

          <S.IconButton type="button" aria-label="Notifications">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 16V11C6 7.69 8.69 5 12 5C15.31 5 18 7.69 18 11V16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M4 16H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </S.IconButton>

          <ProfileBlock
            name={activeProfile?.name}
            email={activeProfile?.email}
            avatar={activeProfile?.avatar}
            profiles={profiles}
            activeProfileId={activeProfile?.id}
            onProfileChange={handleProfileChange}
          />
        </S.Actions>

        <S.MobilePageHeaderSlot>
          <PageHeader />
        </S.MobilePageHeaderSlot>

        <S.HamburgerButton
          type="button"
          aria-label={isMobileSidebarOpen ? "Close sidebar" : "Open sidebar"}
          onClick={() => {
            if (isMobileSidebarOpen) {
              closeMobileSidebar();
            } else {
              openMobileSidebar();
            }
          }}
        >
          {isMobileSidebarVisible ? (
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M4 4L14 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M3 4.5H15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M3 9H15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M3 13.5H15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          )}
        </S.HamburgerButton>
      </S.Container>

      {isMobileSidebarVisible ? (
        <S.MobileSidebarOverlay $closing={isMobileSidebarClosing} onClick={closeMobileSidebar}>
          <S.MobileSidebarPanel $closing={isMobileSidebarClosing || mobileSidebarState === "opening"} onClick={(event) => event.stopPropagation()}>
            <Sidebar
              isMobileDrawer
              onNavigate={closeMobileSidebar}
            />
          </S.MobileSidebarPanel>
        </S.MobileSidebarOverlay>
      ) : null}
    </>
  );
};

export default TopNavbar;