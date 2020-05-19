import React, { useState, useEffect } from 'react';

import Background from '../../../components/Background';
import DateInput from '../../../components/DateInput';

import api from '../../../services/api';

import { Container, HourList, Hour, Title } from './styles';

export default function SelectDateTime({ route, navigation }) {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);

  const { provider } = route.params; //Buscando o nosso paramtro provider de dentro de params

  useEffect(() => {
    async function loadAvailableTimes() {
      const response = await api.get(`providers/${provider.id}/available`, {
        params: {
          date: date.getTime(), // essa  rota precisa enviar um date por params
        },
      });

      setHours(response.data);
    }

    loadAvailableTimes();
  }, [date, provider.id]);

  function handleSelectHour(time) {
    navigation.navigate('Confirm', {
      provider,
      time,
    });
  }

  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />

        <HourList //Listar todos os horarios e se eles estão disponíveis ou não
          data={hours}
          keyExtractor={(item) => item.time}
          renderItem={({ item }) => (
            <Hour
              onPress={() => handleSelectHour(item.value)}
              enabled={item.available}
            >
              <Title>{item.time}</Title>
            </Hour>
          )}
        />
      </Container>
    </Background>
  );
}