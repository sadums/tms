import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { jql } = await request.json();
        console.log(jql)
        const JIRA_KEY: string = process.env.JIRA_API_KEY ?? '';
        if (!JIRA_KEY) {
            return NextResponse.json({ error: 'JIRA API key is missing' }, { status: 400 });
        }

        const bodyData = JSON.stringify({
            expand: ["names", "schema", "operations"],
            fields: ["key", "created", "priority", "summary", "status", "reporter"],
            fieldsByKeys: false,
            jql: "project = VAL",
            maxResults: 15,
            startAt: 0
        });

        const JIRA_DOMAIN = 'https://ifitdev.atlassian.net';

        const response = await fetch(`${JIRA_DOMAIN}/rest/api/3/search`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${Buffer.from(
                    `samuel.adams@ifit.com:${JIRA_KEY}`
                ).toString('base64')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: bodyData
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Jira API Error:', errorData);
            return NextResponse.json({ error: errorData }, { status: response.status });
        }

        const data = await response.json();
        console.log(data);
        return NextResponse.json({ message: data }, { status: 200 });
    } catch (error) {
        console.error("Error during issue search:", error);
        return NextResponse.json({ error: 'Error during issue search' }, { status: 500 });
    }
}
