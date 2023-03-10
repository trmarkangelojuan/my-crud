import React, {useState, useEffect} from 'react'
import axios from 'axios'; import {Link} from 'react-router-dom';
import {ToastContainer, toast } from 'react-toastify';
import {Button, Table,TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import '../styles/Home.css';
import 'react-toastify/dist/ReactToastify.css';
import FormDialog from '../components/ModalForm';
import ConfirmDialog from '../components/ModalConfirm'

const initialState = {
    DESCRIPTION: '',
    WEBSITE: '',
    EMAIL: '',
    PASSWORD: '',
    DATE: new Date().toLocaleString() + ''
}


const Home = () => {
    const [state, setState] = useState(initialState);
    const {DESCRIPTION, WEBSITE, EMAIL, PASSWORD, DATE} = state;
    const [accountList, setAccounts] = useState([]);
    const [id, setID] = useState(0);

    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isUpdating, setUpdating] = useState(false);
    const [fromMultipleDelete, setFromMultiple] = useState(false);

    const notifyDeleteSuccess = (note) => toast.success(note,{toastId: 'success1'}); const notifySuccess = (note) => toast.success(note);
    const notifyWarning = (note) => toast.warn(note);

    useEffect (() => {
        retrieve();
    }, []);


    //input functions ---------------------------------------------------------------------------------------------------------------
    const [items, setRows] = useState({rows: [],});
    const handleCheckbox = (e) => {
        const { value, checked } = e.target;
        const { rows } = items;
        if (checked) {
            setRows({rows: [...rows, value],});
        }
        else {
            setRows({rows: rows.filter((e) => e !== value),});
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!DESCRIPTION.trimStart() || !WEBSITE.trimStart() || !EMAIL.trimStart() || !PASSWORD.trimStart() || !DATE){
            notifyWarning('Please fill up all fields!');
        } else {
            if (!isUpdating){
                addAcc();
            } else {
                updateAcc();
            }
        }
    };
    const handleDelete = () => {
        if (fromMultipleDelete){
            delAll();
        } else{
            deleteAcc(id);
        }
        setShowConfirmation(false);
    }
    const delAll = () => {
        if(items.rows.length === 0){
            notifyWarning('No items to delete!');
        } else {
            for (var i=0; i<items.rows.length ; i++){
                deleteAcc(items.rows[i]);
            }
        }
        setFromMultiple(false);
    }
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({ ...state, [name]: value.trimStart()});
    };
    // --------------------------------------------------------------------------------------------------------------------------
   


    //CRUD -----------------------------------------------------------------------------------------------------------------------------
    const retrieve = async () => {
        const response = await axios.get("http://localhost:3001/api/read");
        setAccounts(response.data);
    };

    const deleteAcc = (id) => {
        axios.delete(`http://localhost:3001/api/delete/${id}`).then(() => { reset(); notifyDeleteSuccess('Account deleted!');});
    }

    const addAcc = () => {
        axios.post("http://localhost:3001/api/create", {
                DESCRIPTION,
                WEBSITE,
                EMAIL,
                PASSWORD,
                DATE
            }).then(() => {notifySuccess('Account added!'); reset();});
    }
    const updateAcc = () => {
        axios.put('http://localhost:3001/api/update', {
            ID: parseInt(id),
            DESCRIPTION: DESCRIPTION,
            WEBSITE: WEBSITE,
            EMAIL: EMAIL,
            PASSWORD: PASSWORD,
            DATE: DATE
        }).then(() => {notifySuccess('Account updated!'); reset();});
    } 
    //----------------------------------------------------------------------------------------------------------------------------
    

    
    var s= false;
    const toggleP = (i) => {
        if (s){
            document.getElementById(`p_input${i}`).setAttribute("type", "password");
            document.getElementById(`eye${i}`).setAttribute("class", "fa-solid fa-eye-slash");
            s = false;
        } else {
            document.getElementById(`p_input${i}`).setAttribute("type", "text");
            document.getElementById(`eye${i}`).setAttribute("class", "fa-sharp fa-solid fa-eye");
            s = true;
        }
    }
    const updating = (id, desc, site, em, pw, dt) => {
        setState({
            DESCRIPTION: desc,
            WEBSITE: site,
            EMAIL: em,
            PASSWORD: pw,
            DATE: dt
        })
        setID(id);
        setShowForm(true);
        setUpdating(true);
    }
    const reset = () => {
        setState({DESCRIPTION: '', WEBSITE: '', EMAIL: '', PASSWORD: '', DATE: new Date().toLocaleString() + ''});
        setUpdating(false);
        setShowForm(false);
        setShowConfirmation(false);
        setID(0);
        setFromMultiple(false);
        setTimeout(() => retrieve(), 500);
    }


    return (
        <div className='main-page'>

            <div className='header'><h1>MyPass <i className="fa-solid fa-lock"></i></h1> <Link to="/"><i className="fa-solid fa-right-from-bracket"></i></Link></div>

            <div className='content'>
                <div className='table-header'><input type='text' placeholder= ' Search' name='search' value={search} onChange={(e) => {setSearch(e.target.value)}}/> <Button className='btn-add' onClick={() => {setShowForm(true)}} variant="contained">Add &ensp;<i className="fa-solid fa-plus"></i></Button></div>
                <div className='tb-container'>
                    <TableContainer component={Paper}>
                    <Table >
                        <TableHead>
                        <TableRow className="table-headers">
                            <TableCell><i onClick={() => {setShowConfirmation(true); setFromMultiple(true);}} className="fa-solid fa-trash"></i></TableCell>
                            <TableCell className='cell-title'>ID</TableCell>
                            <TableCell className='cell-title'>Description</TableCell>
                            <TableCell className='cell-title'>Website/App</TableCell>
                            <TableCell className='cell-title'>Email/Phone</TableCell>
                            <TableCell className='cell-title'>Password</TableCell>
                            <TableCell className='cell-title'>Date Added</TableCell>
                            <TableCell className='control_panel'>Controls</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.values(accountList).filter(acc => acc.DESCRIPTION?.toLocaleLowerCase().includes(search.toLocaleLowerCase())).map((acc, index) => {
                                return <TableRow key={acc.ID}>
                                <TableCell><input id='cb' type='checkbox' value={acc.ID} onChange={handleCheckbox}/></TableCell>
                                <TableCell>{acc.ID}</TableCell>
                                <TableCell>{acc.DESCRIPTION}</TableCell>
                                <TableCell>{acc.WEBSITE}</TableCell>
                                <TableCell>{acc.EMAIL}</TableCell>
                                <TableCell><div className='pw_container'><input id={`p_input${acc.ID}`} disabled type="password" className='p_input' value={acc.PASSWORD}/> <i onClick={() => {toggleP(acc.ID)}} className="fa-solid fa-eye-slash" id={`eye${acc.ID}`}></i></div></TableCell>
                                <TableCell>{acc.DATE}</TableCell>
                                <TableCell className='control_buttons'><div><Button variant="outlined" onClick={() => {updating(acc.ID, acc.DESCRIPTION, acc.WEBSITE, acc.EMAIL, acc.PASSWORD, acc.DATE)}}>Edit</Button> <Button color="error" variant="outlined" onClick={() => {setShowConfirmation(true); setID(acc.ID); setFromMultiple(false);}}>Delete</Button></div></TableCell>
                                </TableRow>
                             })}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </div>
            </div>

            {/* form dialog */}
            {showForm && <FormDialog reset={reset} handleSubmit={handleSubmit} handleInputChange={handleInputChange} DESCRIPTION={DESCRIPTION} WEBSITE={WEBSITE} EMAIL={EMAIL} PASSWORD={PASSWORD} />}

            {/* delete-confirmation dialog */}
            {showConfirmation && <ConfirmDialog no={reset} yes={handleDelete} /> }

            <ToastContainer />
        </div>
    )
}

export default Home