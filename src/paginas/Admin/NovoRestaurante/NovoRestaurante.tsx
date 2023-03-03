import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

export default function NovoRestaurante() {

    const [nomeRestaurante, setNomeRestaurante] = useState('');

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
      if(params.id) {
        http.get<IRestaurante>(`restaurantes/${params.id}/`)
            .then(res => setNomeRestaurante(res.data.nome))
            .catch(err => console.log(err))
      }
    }, [params])
    

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(params.id) {
            http.put(`restaurantes/${params.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => navigate('/admin/restaurantes'))
                .catch(err => console.log(err))
        } else {
            http.post('restaurantes/', {
                nome: nomeRestaurante
            })
                .then(() => navigate('/admin/restaurantes'))
                .catch(err => console.log(err))
        }
    }

    return (
        <Box sx={{display:'flex', flexGrow: 1, flexDirection:'column', alignItems:'center'}}>
            <Typography component="h1" variant="h6">
                Formulário de Restaurantes
            </Typography>
            <Box sx={{ width: '100%'}} component="form" onSubmit={onSubmit}>            
                <TextField
                    value={nomeRestaurante}
                    onChange={event => setNomeRestaurante(event.target.value)}
                    label="Nome do Restaurante"
                    variant="standard"
                    fullWidth
                    required
                />
                <Button
                    sx={{marginTop: 1}}
                    variant="contained"
                    type="submit"
                    fullWidth
                >
                    Salvar
                </Button>
            </Box>
        </Box>
    )
}
