import React from "react";
import styled from "styled-components/native";

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

const Container = styled.View`
  flex: 1;
`;

const Header = styled.View`
  flex: 1;
  background-color: red;
`;
const Column = styled.View`
  flex: 1;
  background-color: tomato;
`;
const Footer = styled.View`
  flex: 1;
  background-color: blue;
`;

const Movies = ({ navigation: { navigate } }) => (
  <Container>
    <Header></Header>
    <Column>
      <Btn onPress={() => navigate("Stack", { screen: "Three" })}>
        <Title>Movies</Title>
      </Btn>
    </Column>
    <Footer></Footer>
  </Container>
);

export default Movies;
