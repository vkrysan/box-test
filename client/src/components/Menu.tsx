import React, { useContext, useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { ColorModeContext } from '../App';

interface MenuProps {
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setDepth: (depth: number) => void;
}

const Menu: React.FC<MenuProps> = ({ setWidth, setHeight, setDepth }) => {
  const [localWidth, setLocalWidth] = useState<string>('1');
  const [localHeight, setLocalHeight] = useState<string>('1');
  const [localDepth, setLocalDepth] = useState<string>('1');
  const colorMode = useContext(ColorModeContext);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cubeData = {
      width: localWidth,
      height: localHeight,
      depth: localDepth,
    };

    try {
      
      const response = await fetch('http://localhost:5000/api/cube', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cubeData),
      });

      const result = await response.json();
      console.log('Данные успешно отправлены на сервер:', result);

    
      const fetchResponse = await fetch('http://localhost:5000/api/cube');
      const data = await fetchResponse.json();
      console.log('Получены обновленные данные с сервера:', data);

      
      setWidth(Number(data.width));
      setHeight(Number(data.height));
      setDepth(Number(data.depth));
    } catch (error) {
      console.error('Ошибка при сохранении или получении данных куба:', error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', p: 2, gap: 2 }}
    >
      <TextField
        label="Width"
        type="number"
        value={localWidth}
        onChange={(e) => setLocalWidth((e.target.value))}
        fullWidth
      />
      <TextField
        label="Height"
        type="number"
        value={localHeight}
        onChange={(e) => setLocalHeight((e.target.value))}
        fullWidth
      />
      <TextField
        label="Depth"
        type="number"
        value={localDepth}
        onChange={(e) => setLocalDepth((e.target.value))}
        fullWidth
      />
      <Button variant="contained" color="primary" type="submit">
        Update Cube
      </Button>
      <Button variant="outlined" color="secondary" onClick={colorMode.toggleColorMode}>
        Toggle Theme
      </Button>
    </Box>
  );
};

export default Menu;

