import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";
import IRestaurante from "../../../interfaces/IRestaurante";
import { ITag } from "../../../interfaces/ITag";

export default function NovoPrato() {

    const [nomePrato, setNomePrato] = useState('');
    const [descricaoPrato, setDescricaoPrato] = useState('');
    const [imagem, setImagem] = useState<File | null>(null);

    const [tag, setTag] = useState('');
    const [restaurante, setRestaurante] = useState('');

    const [tags, setTags] = useState<ITag[]>([]);
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        http.get<{ tags: ITag[] }>(`tags/`)
            .then(res => setTags(res.data.tags))
            .catch(err => console.log(err))

        http.get<IRestaurante[]>(`restaurantes/`)
            .then(res => setRestaurantes(res.data))
            .catch(err => console.log(err))
    }, [])

    const selecionarArquivo = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files?.length) {
            setImagem(event.target.files[0])
        } else {
            setImagem(null)
        }
    }
    

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('nome', nomePrato)
        formData.append('descrocap', descricaoPrato)
        formData.append('tag', tag)
        formData.append('restaurante', restaurante)

        if(imagem) {
            formData.append('imagem', imagem)
        }

        http.request({
            url: 'pratos/',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
            .then(() => navigate('/admin/pratos'))
            .catch(err => console.log(err))
    }

    return (
        <Box sx={{display:'flex', flexGrow: 1, flexDirection:'column', alignItems:'center'}}>
            <Typography component="h1" variant="h6">
                Formulário de Restaurantes
            </Typography>
            <Box sx={{ width: '100%'}} component="form" onSubmit={onSubmit}>            
                <TextField
                    value={nomePrato}
                    onChange={event => setNomePrato(event.target.value)}
                    label="Nome do Prato"
                    variant="standard"
                    fullWidth
                    margin="dense"
                    required
                />
                
                <TextField
                    value={descricaoPrato}
                    onChange={event => setDescricaoPrato(event.target.value)}
                    label="Descrição do Prato"
                    variant="standard"
                    fullWidth
                    margin="dense"
                    required
                />
                
                <FormControl
                    fullWidth
                    margin="dense"
                >
                    <InputLabel id="select-tag">Tag</InputLabel>
                    <Select labelId="select-tag" value={tag} onChange={event => setTag(event.target.value)}>
                        {
                            tags.map(tag => 
                            <MenuItem key={tag.id} value={tag.value}>{tag.value}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                
                <FormControl
                    fullWidth
                    margin="dense"
                >
                    <InputLabel id="select-restaurante">Restaurante</InputLabel>
                    <Select labelId="select-restaurante" value={restaurante} onChange={event => setRestaurante(event.target.value)}>
                        {
                            restaurantes.map(restaurante => 
                            <MenuItem key={restaurante.id} value={restaurante.id}>{restaurante.nome}</MenuItem>)
                        }
                    </Select>
                </FormControl>

                <input type="file" onChange={selecionarArquivo} />

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
