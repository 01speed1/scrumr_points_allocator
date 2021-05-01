import React from 'react';
import { TaskProvider } from './contexts/UseTasksContext';
import MainTaskContainer from './mainTaskContainer';
import { CurrentUserProvider } from './contexts/UseCurrentUserContext';
import PageContainer from './components/layout/pageContainer';

export default function App() {
  return (
    <TaskProvider>
      <CurrentUserProvider>
        <PageContainer>
          <div className="__page-title-box --sticky-top">
            <h1 className="__main-title ">Scrumr 2.3</h1>
          </div>
          <MainTaskContainer />
        </PageContainer>
      </CurrentUserProvider>
    </TaskProvider>
  );
}
