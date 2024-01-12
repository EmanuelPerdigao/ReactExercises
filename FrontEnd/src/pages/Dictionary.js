import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DictionarySearch from '../components/DefinitionSearch';

export default function Dictionary() {
    return (
        <DictionarySearch/>
    )
}