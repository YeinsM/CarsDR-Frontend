import { Breadcrumb, MenuModal } from '@/types'
import React from 'react'

const breadCrumGenerator = (menuModel: MenuModal[]): Breadcrumb[] => {
    const breadcrumbs: Breadcrumb[] = [];

    const build = (item: MenuModal, parents: string[] = []) => {
        const current = [...parents, item.label]

        if (item.to) {
            breadcrumbs.push({ labels: current, to: item.to })
        }

        if (item.items?.length) {
            item.items.forEach(sub => build(sub, current))
        }
    }

    menuModel.forEach(item => build(item))

    return breadcrumbs
}

export default breadCrumGenerator