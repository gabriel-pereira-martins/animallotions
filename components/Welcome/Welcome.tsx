import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Box, Button, Card, Center, Container, Group, Image, Input, Modal, PasswordInput, Text } from '@mantine/core';

export function Welcome() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function loginUser() {
    if (!formData.email || !formData.password) {
      setErrorMessage('Por favor, preencha todos os campos.');
      setErrorModal(true);
      return;
    }

    const response = await fetch('http://localhost:3010/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      router.push('/logon');
    } else {
      setErrorMessage(data.message || 'Login e/ou senha inválidos.');
      setErrorModal(true);
    }
  }

  return (
    <>

      <Modal
        opened={errorModal}
        onClose={() => setErrorModal(false)}
        title="Erro no Login"
        centered
      >
        <Text>{errorMessage}</Text>
      </Modal>

      <Box style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>
        <Link href="/quem-somos">
          <Button variant="outline">Quem somos?</Button>
        </Link>
      </Box>
      <Center
  style={{
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>

  <Modal
    opened={errorModal}
    onClose={() => setErrorModal(false)}
    title="Erro no Login"
    centered
  >
    <Text>{errorMessage}</Text>
  </Modal>

  <Card
    shadow="sm"
    padding="lg"
    radius="md"
    withBorder
    style={{
      maxWidth: '400px',
      width: '100%',
      textAlign: 'center',
      paddingBottom: '1.5rem',
    }}
  >
    <Image
      radius="md"
      width={200}
      fit="contain"
      src={
        'https://s3-alpha-sig.figma.com/img/cb11/aa39/f820ecfd8dcd6c02963bfa3805f402df?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=A5Ben2bQMjjXplWkPiGsq94ysnuNszIKJc5MG1Cxa93GniIQ5Mf0ZYU~l~aRM6gfPuBmFzNbZL4xx1ApQv-9ovWM-0GIEF7BiBUgUV0XN6vLgHDrypZ-rvD-EO-Y3poVd3KIyp9fHHuFYt4QHCG0rsWSMx3A7ZAaOXBTnU~triXAQeBZJCHArif-ZJxkRFQVXuZBJv6kjNJDxORbCew6zVaBHxrqNIF0GeqNfFCh1mZ1w2qFVIjJqZMCcW42ZMC7bPHaxcu7-pg25p~SCbTj~Yebpy66T9zrhaxUuKfWk6roD7bg20e0UWdpl5u~oxMShvTaxVsyE9VKYKl9Toe7lA__'
      }
    />

    <Card.Section>
      <Container mt="sm">
        <Input.Wrapper>
          <Input
            placeholder="Usuário"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Input.Wrapper>
        <PasswordInput
          name="password"
          mt="md"
          placeholder="Senha"
          value={formData.password}
          onChange={handleInputChange}
        />
        <Group mt="md">
          <Button variant="login" fullWidth onClick={loginUser}>
            Entrar
          </Button>
          <Button variant="filled" fullWidth>
            <Link href="/cadastro">Cadastrar</Link>
          </Button>
        </Group>
      </Container>
    </Card.Section>
  </Card>
</Center>



    </>
  );
}
