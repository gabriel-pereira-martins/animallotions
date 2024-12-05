import { Card, Text, Center, Container, Title, Stack, Button } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

export default function QuemSomos() {
  return (
    <Center style={{ flexDirection: 'column', padding: '2rem' }}>
      <Container style={{ maxWidth: '400px', width: '100%' }}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>

          <Center>
            <img
              src="https://s3-alpha-sig.figma.com/img/cb11/aa39/f820ecfd8dcd6c02963bfa3805f402df?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=A5Ben2bQMjjXplWkPiGsq94ysnuNszIKJc5MG1Cxa93GniIQ5Mf0ZYU~l~aRM6gfPuBmFzNbZL4xx1ApQv-9ovWM-0GIEF7BiBUgUV0XN6vLgHDrypZ-rvD-EO-Y3poVd3KIyp9fHHuFYt4QHCG0rsWSMx3A7ZAaOXBTnU~triXAQeBZJCHArif-ZJxkRFQVXuZBJv6kjNJDxORbCew6zVaBHxrqNIF0GeqNfFCh1mZ1w2qFVIjJqZMCcW42ZMC7bPHaxcu7-pg25p~SCbTj~Yebpy66T9zrhaxUuKfWk6roD7bg20e0UWdpl5u~oxMShvTaxVsyE9VKYKl9Toe7lA__"
              alt="Animal Lotions"
              style={{ borderRadius: '8px', maxWidth: '100%', marginBottom: '1.5rem' }}
            />
          </Center>


          <Stack>

            <div>
              <Title order={3} mb="md">
                Quem Somos?
              </Title>
              <Text>
                Nossa jornada começou com um grupo de amigos e voluntários apaixonados por animais, todos motivados pelo desejo de reduzir o abandono e transformar o futuro de cães e gatos em situação de
                vulnerabilidade. Cada um de nós se juntou a este sonho, criando um lugar seguro e acolhedor, onde os animais encontram um novo lar cheio de carinho.
              </Text>
            </div>


            <div>
              <Title order={3} mb="md">
                Objetivos
              </Title>
              <Text>
                Nosso objetivo principal é transformar vidas por meio da adoção responsável, oferecendo aos animais abandonados e resgatados uma segunda chance. Acreditamos na criação de um mundo mais seguro,
                acolhedor e cheio de amor para todos os seres vivos.
              </Text>
            </div>


            <div>
              <Title order={3} mb="md">
                Valores
              </Title>
              <Text>
                Somos guiados por uma série de valores fundamentais que orientam cada uma de nossas ações e parcerias: respeito, empatia e compromisso com o bem-estar animal e humano. Trabalhamos com dedicação
                para construir uma sociedade mais solidária e responsável.
              </Text>
            </div>
          </Stack>
        </Card>

        <Center mt="xl">
        <Link href="/" passHref>

          <Button variant="outline">
            Voltar
          </Button>

        </Link>
        </Center>
      </Container>
    </Center>
  );
}
