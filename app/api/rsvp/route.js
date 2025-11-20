import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

export async function GET() {
    try {
        const gifts = await prisma.gift.findMany({
            select: { name: true }
        })
        return NextResponse.json({ gifts: gifts.map(g => g.name) })
    } catch (error) {
        console.error('Error fetching gifts:', error)
        return NextResponse.json({ success: false, error: 'Failed to fetch gifts' }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const body = await request.json()
        const { name, guests, message, pix, selectedGifts } = body

        const guest = await prisma.guest.create({
            data: {
                name,
                guests: parseInt(guests),
                message,
                pix,
                gifts: {
                    create: selectedGifts.map(gift => ({
                        name: gift.name
                    }))
                }
            }
        })

        return NextResponse.json({ success: true, guest })
    } catch (error) {
        console.error('Error saving RSVP:', error)
        return NextResponse.json({ success: false, error: 'Failed to save RSVP' }, { status: 500 })
    }
}
