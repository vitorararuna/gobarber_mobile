import styled from 'styled-components/native';

export const Container = styled.SafeAreaView` /* Não ocupar o espaço da statusBar */
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,     // não mostrar inicador de scrool
  contentContainerStyle: { padding: 30 }, // estilo relacionado apenas ao conteúdo da lista
})``;