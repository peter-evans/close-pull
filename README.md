# Close Pull
[![CI](https://github.com/peter-evans/close-pull/workflows/CI/badge.svg)](https://github.com/peter-evans/close-pull/actions?query=workflow%3ACI)
[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-Close%20Pull-blue.svg?colorA=24292e&colorB=0366d6&style=flat&longCache=true&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAM6wAADOsB5dZE0gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAERSURBVCiRhZG/SsMxFEZPfsVJ61jbxaF0cRQRcRJ9hlYn30IHN/+9iquDCOIsblIrOjqKgy5aKoJQj4O3EEtbPwhJbr6Te28CmdSKeqzeqr0YbfVIrTBKakvtOl5dtTkK+v4HfA9PEyBFCY9AGVgCBLaBp1jPAyfAJ/AAdIEG0dNAiyP7+K1qIfMdonZic6+WJoBJvQlvuwDqcXadUuqPA1NKAlexbRTAIMvMOCjTbMwl1LtI/6KWJ5Q6rT6Ht1MA58AX8Apcqqt5r2qhrgAXQC3CZ6i1+KMd9TRu3MvA3aH/fFPnBodb6oe6HM8+lYHrGdRXW8M9bMZtPXUji69lmf5Cmamq7quNLFZXD9Rq7v0Bpc1o/tp0fisAAAAASUVORK5CYII=)](https://github.com/marketplace/actions/close-pull)

A GitHub action to close a pull request and optionally delete its branch.

## Usage

| :exclamation:  Using this action is no longer necessary   |
|-----------------------------------------------------------|

The same functionality exists in the GitHub CLI. See the documentation [here](https://cli.github.com/manual/gh_pr_close).
```yml
    - name: Close Pull
      run: gh pr close --comment "Auto-closing pull request" --delete-branch "1"
      env:
        GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

If you prefer to use this action:
```yml
      - name: Close Pull
        uses: peter-evans/close-pull@v3
        with:
          pull-request-number: 1
          comment: Auto-closing pull request
          delete-branch: true
```

### Action inputs

| Name | Description | Default |
| --- | --- | --- |
| `token` | `GITHUB_TOKEN` or a `repo` scoped [PAT](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token). | `GITHUB_TOKEN` |
| `repository` | The GitHub repository containing the pull request. | Current repository |
| `pull-request-number` | The number of the pull request to close. | `github.event.number` |
| `comment` | A comment to make on the pull request before closing. | |
| `delete-branch` | Delete the pull request branch. | `false` |

Note: Deleting branches will fail silently for pull requests to public repositories from forks.
Private repositories can be configured to [enable workflows](https://docs.github.com/en/github/administering-a-repository/disabling-or-limiting-github-actions-for-a-repository#enabling-workflows-for-private-repository-forks) from forks to run without restriction.

### Accessing pull requests in other repositories

You can close pull requests in another repository by using a [PAT](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) instead of `GITHUB_TOKEN`.
The user associated with the PAT must have write access to the repository.

## License

[MIT](LICENSE)
