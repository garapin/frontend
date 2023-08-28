import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { title } from 'process';
import React, { useState } from 'react'

export const useConfirm = () => {
    const [open, setOpen] = useState(false);
    const [resolver, setResolver] = useState<{resolver: Function|null}>({resolver: null})
    const [title, setTitle] = useState('');
    const [confirmText, setConfirmText] = useState<string|undefined>();
    const [cancelText, setCancelText] = useState<string|undefined>();
    const [description, setDescription] = useState('');
    
    const getConfirmation = async (title: string, description: string, confirmText?: string, cancelText?:string) => {
        setOpen(true);
        setTitle(title);
        setDescription(description);
        setConfirmText(confirmText);
        setCancelText(cancelText);
        return new Promise((resolve, reject) => {
            setResolver({resolver: resolve});
        })
    }

    const onClick = async (status:boolean) => {
        setOpen(false)
        if (resolver.resolver !== null) resolver.resolver(status);
    }

    const ConfirmDialog = () => (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Typography>
                    {description}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button variant='text' onClick={() => onClick(false)}>{cancelText ?? 'Cancel'}</Button>
                <Button color='primary' variant='contained' onClick={() => onClick(true)}>{confirmText ?? 'Confirm'}</Button>
            </DialogActions>
        </Dialog>
    )

    return [getConfirmation, ConfirmDialog]
}