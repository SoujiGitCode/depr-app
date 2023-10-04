import group from "@/assets/images/icon-group.png"

import React from 'react';

interface GroupLogoProps {
    bottom?: number;
    right?: number;
}

export default function GroupLogo({ bottom = 50, right = -100 }: GroupLogoProps) {
    return (
        <img src={group} alt="Group Icon" style={{
            position: 'absolute',
            bottom: bottom,
            right: right,
        }} />
    )
}
