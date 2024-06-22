"use client"
import React from 'react'
import { Switch } from './ui/switch'
import { Label } from './ui/label'

const ToggleAnonymous = () => {
    return (
        <div className="flex items-center space-x-2">
            <Switch id="anonymous" />
            <Label htmlFor="anonymous">Anonymous</Label>
        </div>

    )
}

export default ToggleAnonymous