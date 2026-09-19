"""add application details

Revision ID: f8e413352aa2
Revises:
Create Date: 2026-09-12 21:06:15.697221

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f8e413352aa2'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        'applications',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('company', sa.String(length=100), nullable=False),
        sa.Column('position', sa.String(length=100), nullable=False),
        sa.Column('status', sa.String(length=50), nullable=False),
        sa.Column('date_applied', sa.DateTime(), nullable=True),
        sa.Column('interview_date', sa.DateTime(), nullable=True),
        sa.Column('notes', sa.String(length=500), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table('applications')