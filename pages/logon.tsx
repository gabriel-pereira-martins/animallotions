import { Card, Modal, Image, Text, Group, Title, Button, SimpleGrid, Box, FileInput, Textarea, TextInput } from '@mantine/core';
import { IconBrandInstagram, IconBrandTelegram, IconBrandWhatsapp } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import React, { useState, ChangeEvent } from 'react';

// Função para envio de imagem para o backend (que fará o upload no S3)
const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  // Envia a imagem para o backend, que vai realizar o upload no S3
  const response = await fetch('http://localhost:3010/upload/image', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const result = await response.json();
    return result.imageUrl; // Retorna a URL da imagem no S3
  } else {
    throw new Error('Erro ao fazer o upload da imagem');
  }
};

export default function InitialPage() {
  const animals = [
    {
      name: 'Pipoca',
      description: 'Descrição do Animal',
      image: 'https://via.placeholder.com/250x150',
      socials: {
        whatsapp: '#',
        instagram: '#',
        telegram: '#',
      },
    },
    {
      name: 'Biscoito',
      description: 'Um animal muito amoroso!',
      image: 'https://via.placeholder.com/250x150',
      socials: {
        whatsapp: '#',
        instagram: '#',
        telegram: '#',
      },
    },
    {
      name: 'Bolota',
      description: 'Alegre e cheio de energia!',
      image: 'https://via.placeholder.com/250x150',
      socials: {
        whatsapp: '#',
        instagram: '#',
        telegram: '#',
      },
    },
    {
      name: 'Mimi',
      description: 'Amorosa e companheira!',
      image: 'https://via.placeholder.com/250x150',
      socials: {
        whatsapp: '#',
        instagram: '#',
        telegram: '#',
      },
    },
    {
      name: 'Lulu',
      description: 'Carinhosa e cheia de energia!',
      image: 'https://via.placeholder.com/250x150',
      socials: {
        whatsapp: '#',
        instagram: '#',
        telegram: '#',
      },
    },
    {
      name: 'Toby',
      description: 'Amigável e brincalhão!',
      image: 'https://via.placeholder.com/250x150',
      socials: {
        whatsapp: '#',
        instagram: '#',
        telegram: '#',
      },
    },
  ];

  const [opened, { open, close }] = useDisclosure(false);
  const [formData, setFormData] = useState({
    name: '',
    image: null as File | null,
    description: '',
  });

  const [isLoading, setIsLoading] = useState(false); // Estado para controle de loading

  // Função para criar o pet
  const createPet = async (name: string, image: File | null, description: string) => {
    try {
      setIsLoading(true); // Inicia o carregamento
      let imageUrl = '';
      if (image) {
        imageUrl = await uploadImage(image); // Faz o upload da imagem
      }

      const petData = {
        name,
        description,
        image: imageUrl, // A URL da imagem após o upload
      };

      const response = await fetch('http://localhost:3010/pet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(petData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Pet criado com sucesso:', data);
        close(); // Fecha o modal após o sucesso
      } else {
        throw new Error('Falha ao criar o pet.');
      }
    } catch (error) {
      console.error('Erro ao criar o pet:', error);
    } finally {
      setIsLoading(false); // Desativa o carregamento
    }
  };

  // Função chamada ao enviar o formulário
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.name || !formData.description || !formData.image) {
      alert('Por favor, preencha todos os campos!');
      return;
    }
    createPet(formData.name, formData.image, formData.description); // Passando os dados corretamente
  };

  // Função para lidar com o campo de input de texto
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Função para lidar com a mudança de imagem
  const handleImageChange = (file: File | null) => {
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '100px',
      }}
    >
      <Image
        radius={"md"}
        w="250px"
        h="250px"
        fit="contain"
        src={'https://via.placeholder.com/250x150'}
        style={{
          position: 'fixed',
          top: '1px',
          left: '1px',
        }}
      />

      <Modal opened={opened} onClose={close} title="Cadastro do Pet" centered>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Nome"
            placeholder="Digite o nome do animal"
            withAsterisk
            mb="md"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <FileInput
            label="Anexar Foto"
            placeholder="Selecione uma imagem"
            withAsterisk
            mb="md"
            onChange={handleImageChange}
            accept="image/*" // Aceita somente imagens
          />
          {formData.image && (
            <Image
              src={URL.createObjectURL(formData.image)} // Exibe uma prévia da imagem
              alt="Imagem do Pet"
              style={{ marginTop: '20px' }}
            />
          )}
          <Textarea
            label="Descrição"
            placeholder="Digite uma descrição"
            minRows={4}
            withAsterisk
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <Group mt="md">
            <Button onClick={close} variant="default">
              Cancelar
            </Button>
            <Button type="submit" loading={isLoading}>
              {isLoading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </Group>
        </form>
      </Modal>

      <Button onClick={open}
        style={{
          position: 'fixed',
          top: '40px',
          right: '45%',
        }}
      >
        Cadastre seu pet!
      </Button>

      <SimpleGrid cols={3} spacing={50}>
        {animals.map((animal, index) => (
          <Card
            key={index}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{
              width: '250px',
              textAlign: 'center',
            }}
          >
            <Card.Section>
              <Image
                src={animal.image}
                alt={`Imagem de ${animal.name}`}
                height={150}
                radius="md"
              />
            </Card.Section>
            <Title
              order={4}
              mt="md"
              style={{
                textAlign: 'center',
                border: '1px solid #000',
                borderRadius: '12px',
                padding: '4px',
              }}
            >
              {animal.name}
            </Title>
            <Text size="sm" color="dimmed" mt="xs">
              {animal.description}
            </Text>
            <Group mt="md">
              <Button
                variant="subtle"
                color="green"
                style={{ padding: 0, height: '30px', width: '30px', borderRadius: '50%' }}
                component="a"
                href={animal.socials.whatsapp}
              >
                <IconBrandWhatsapp size={20} />
              </Button>
              <Button
                variant="subtle"
                color="pink"
                style={{ padding: 0, height: '30px', width: '30px', borderRadius: '50%' }}
                component="a"
                href={animal.socials.instagram}
              >
                <IconBrandInstagram size={20} />
              </Button>
              <Button
                variant="subtle"
                color="blue"
                style={{ padding: 0, height: '30px', width: '30px', borderRadius: '50%' }}
                component="a"
                href={animal.socials.telegram}
              >
                <IconBrandTelegram size={20} />
              </Button>
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}
