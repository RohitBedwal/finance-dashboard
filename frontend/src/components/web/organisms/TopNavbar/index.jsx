import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
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
  const { pathname } = useLocation();
  const [profiles, setProfiles] = useState([]);
  const [activeProfile, setActiveProfileState] = useState(getActiveProfile());
  const [mobileSidebarState, setMobileSidebarState] = useState("closed");
  const mobileSidebarStateRef = useRef(mobileSidebarState);
  const closeTimeoutRef = useRef(null);
  const openFrameRef = useRef(null);

  const isMobileSidebarVisible = mobileSidebarState !== "closed";
  const isMobileSidebarOpen = mobileSidebarState === "open";
  const isMobileSidebarClosing = mobileSidebarState === "closing";

  useEffect(() => {
    mobileSidebarStateRef.current = mobileSidebarState;
  }, [mobileSidebarState]);

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
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
      if (openFrameRef.current) {
        cancelAnimationFrame(openFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      <S.Container>
        <S.DesktopPageHeaderSlot>
          <PageHeader title="Dahsboard]" description="gg" />
        </S.DesktopPageHeaderSlot>

        <S.Actions>
          <S.IconButton type="button" aria-label="Search">
            <svg width="24" height="24">
              <use href="/icons.svg#search" />
            </svg>
          </S.IconButton>

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
          <PageHeader title="Dahsboard]" description="gg" />
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