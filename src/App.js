import React from 'react';
import TitleBar from './Components/TitleBar/index'
import { StateProvider } from './state'
import InputArea from './Components/InputArea/index';
import Display from './Components/Display/index';
import { Container, Footer } from './styles';

const App = () => {
	return (
		<StateProvider>
      <Container>
        <TitleBar />
        <InputArea />
        <Display />
        <Footer>Made by Rodney Lafuente Mercado for Math 121</Footer>
      </Container>
		</StateProvider>
  )
}

export default App