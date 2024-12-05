import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { Box, Button, Card, Center, Container, Group, Image, Input, MantineProvider, PasswordInput, Stack, Text, Title } from '@mantine/core';


export default function Cadastro() {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };



  async function createUser() {

    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    const response = await fetch('http://localhost:3010/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Usuário cadastrado com sucesso!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } else {
      alert(`Erro ao cadastrar: ${data.message}`);
    }
  }


  return (

    <Center style={{ height: '100vh', flexDirection: 'column', justifyContent: 'flex-start', gap: '1px', paddingTop: '1rem' }}>
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ paddingBottom: '10rem' }}>
    <Link href="/" passHref>

      <Button variant="outline">
      Voltar
      </Button>

    </Link>
      <Image
        radius={"md"}
        w= "400px" fit = "contain"
        src={'https://s3-alpha-sig.figma.com/img/cb11/aa39/f820ecfd8dcd6c02963bfa3805f402df?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=A5Ben2bQMjjXplWkPiGsq94ysnuNszIKJc5MG1Cxa93GniIQ5Mf0ZYU~l~aRM6gfPuBmFzNbZL4xx1ApQv-9ovWM-0GIEF7BiBUgUV0XN6vLgHDrypZ-rvD-EO-Y3poVd3KIyp9fHHuFYt4QHCG0rsWSMx3A7ZAaOXBTnU~triXAQeBZJCHArif-ZJxkRFQVXuZBJv6kjNJDxORbCew6zVaBHxrqNIF0GeqNfFCh1mZ1w2qFVIjJqZMCcW42ZMC7bPHaxcu7-pg25p~SCbTj~Yebpy66T9zrhaxUuKfWk6roD7bg20e0UWdpl5u~oxMShvTaxVsyE9VKYKl9Toe7lA__'}
      />

  <Card.Section>
        <Stack gap= "md">
            <MantineProvider
            theme={{
                defaultRadius:'md'
            }}
            >
            <Container mt={'sm'}   style={{ width: '80%' }}>
                <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '300px'}}>

                <Input
                    name="firstName"
                    placeholder="Usuário"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="lastName"
                    placeholder="Sobrenome"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <PasswordInput
                    name="password"
                    placeholder="Senha"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <PasswordInput
                    name="confirmPassword"
                    placeholder="Confirme a senha"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />

                  <Button color="#ED531C" onClick={createUser}>
                    Finalizar cadastro
                  </Button>
                </Box>
            </Container>
            </MantineProvider>
        </Stack>

  </Card.Section>
  </Card>
    </Center>

  );
}